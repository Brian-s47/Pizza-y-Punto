// Zona de importacion de librerias
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';

// Zona de importacion de modulos
import { cliente } from '../db/conexion.js';
import Pedido from '../models/Pedido.js';
import connection from '../db/conexion.js'
import { esperarTecla }  from '../cli/menus.js'
import { solictarDatosPedido } from '../services/pedidosService.js'
import { ObjectId } from 'mongodb';


// Zona de Funciones de servicios

// Realizar pedido (Transaccion)

async function realizarPedido(clienteId, pizzas, total, repartidorId) {
  const session = cliente.startSession(); // creamos sesion para transaccion
  session.startTransaction();
  const db = await connection(); // Conectamos con la BD y la traemos
  try{
    console.log("🧾 Paso 1: Cargando pizzas actuales...");
    const pizzasActuales = db.collection('pizzas'); // Traemos todas las pizzas actuales en BD
    // Validacion de Stock de ingredientes para pizzas pedidas
    // Creamos array de pizzas pedidas comparando las pizzas actuales donde el id coincida con el id del mapeo de las pizzas selesccionadas en solicitar datos
    const pizzasActualesPedidas = await pizzasActuales.find({_id: {$in: pizzas.map(p => p.pizzaId)}}).toArray();
    console.log("✅ Pizzas actuales cargadas:", pizzasActualesPedidas.length);

    // Variable para guardar los ingredientes requeridos para estas pizzas como objeto ya que los ingredientes son objetos
    const ingredientesRequeridos = {};

    console.log("🧾 Paso 2: Recorriendo pizzas para calcular ingredientes...");
    // Recorremos las pizzas enviadas su Id y cantidad y por cada pizza actual pedida en inventario
    for (const { pizzaId, cantidad} of pizzas){
      // guardamos cada piza que recorremos donde coincida el _id
      const pizza = pizzasActualesPedidas.find(p => p._id.toString() === pizzaId.toString());
      // Recorremos los ingredientes de la pizza y traemos su id 
      pizza.ingredientes.forEach(idIng => {
        const id = idIng.toString();
        // le agregamos a ingredientes requeridos el ingrediente requerido mas la cantidad y validamos la ipcion si es cero
        ingredientesRequeridos[id] = (ingredientesRequeridos[id] || 0) + cantidad; 
      });
    };
    console.log("✅ Ingredientes requeridos:", ingredientesRequeridos);

    console.log("🧾 Paso 3: Validando stock de ingredientes...");
    // traemos los ingredientes actuales en BD
    const ingredientesCollection = db.collection('ingredientes');
    const ingredientesActuales = await ingredientesCollection.find().toArray();
    // Validamos que se tenga stock suficiente
    for (const ing of ingredientesActuales){
      //traemos el requerido
      const requerido = ingredientesRequeridos[ing._id.toString()];
      // validacion de stock
      if (ing.stock < requerido){
        throw new error ('❌ Stock insuficiente para el ingrediente: ${ing.nombre}')
      }
    };
    console.log("✅ Stock validado correctamente");

    console.log("🧾 Paso 4: Actualizando stock de ingredientes...");
    // Si no tenemos error en la validacion anterior restamos el stock en ingredientes segun se requiera
    // recorremos los ingredientesRequeridos que son un Objeto en un array de arrays mucho mejor para recorre y usar : Object.entries(ingredientesRequeridos)
    for( const [id, cantidad] of Object.entries(ingredientesRequeridos)){
      // actualizamos en BD de ingredientes restando el stock segu cantidad
      await ingredientesCollection.updateOne(
        { _id: new ObjectId(id)},
        { $inc: {stock: -cantidad}},
        {session}
      )
    };
    console.log("✅ Ingredientes actualizados");
    console.log("🧾 Paso 5: Insertando pedido...");

    console.log("💾 Insertando pedido con:", {
      clienteId,
      pizzas,
      repartidorId
    });
    // insertamos pedido en BD de pedidos
      const pedidoInsertado =await db.collection('pedidos').insertOne({
        clienteId: new ObjectId(clienteId),
        pizzas: pizzas.map(p => ({
          pizzaId: new ObjectId(p.pizzaId),
          cantidad: p.cantidad
      })),
      total,
      fecha: new Date(),
      repartidorAsignado: new ObjectId(repartidorId)
    }, { session });
    console.log("✅ Pedido insertado con ID:", pedidoInsertado.insertedId);
    
    console.log("🧾 Paso 6: Actualizando estado del repartidor...");
    // Cambiamos el estado del repatidor a false ya que estara ocupado
    await db.collection('repartidores').updateOne(
      { _id: new ObjectId(repartidorId) },
      { $set: { estado: false } },
      { session }
    );
    
    console.log("🧾 Paso 7: Referenciando pedido en cliente...");
    // Referenciamos el Id de peiddo en cliente
    await db.collection('clientes').updateOne(
      { _id: new ObjectId(clienteId) },
      { $push: { pedidos: pedidoInsertado.insertedId } },
      { session }
    );
    console.log("🧾 Paso 8: Confirmando transacción...");
    // Mensaje de transaccion completa
    console.log("✅ Pedido procesado correctamente");
    await esperarTecla()
  }catch (error){
    console.error("❌ Error en la transacción:", error.message);
    await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  await esperarTecla()
};

// Crear un Pedido
async function crearPedido(clienteId, total, pizzas, repartidorId){
    const pedido = new Pedido(clienteId, total, pizzas, repartidorId) // Instanciamos pedido
    const db = await connection(); // Conectamos con la BD y la traemos
    const coleccion = db.collection("pedidos"); // Traemos la coleccion de pedidos de la BD
    await coleccion.insertOne(pedido); // insertamos el nuevo pedido creada
    console.log(`Se a creado correctamente el pedido`); // Mensaje de correcta creacion de pedido
    await esperarTecla();
};  

// Listar Pedidos
async function listarPedidos(){
    // Obtenermos las pedidos actuales
    const pedidos = await Pedido.getPedidos()
    // Validacion si existen Pedidos
    if(pedidos.lenhgth === 0){
        console.log(`No se tienen Pedidos registradas`); // Mensaje de error no existen Pedidos en la BD
        await esperarTecla();
    } else{
        const titulo = chalk.bold.cyan('📋 Listado de Pedidos') 
          console.log(boxen(titulo, {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'green',
                align: 'center'
            }));
        const linea = chalk.gray('────────────────────────────────────────────')
        console.log(titulo)
        // Convercion para array de pedidos imprimir correctamente
        const pedidosVisibles = pedidos.map(({ _id, id, pizzas, ...rest }) => ({
            ...rest,
            pizzas: Array.isArray(pizzas)
            ? pizzas.join(' , ')
            : 'Sin pizzas'
        }));

        console.table(pedidosVisibles)
        console.log(linea);
        await esperarTecla();
    }
};

// Editar Pedidos
async function editarPedido(){
    // Obtenermos las Pedidos actuales
    const pedidos = await Pedido.getPedidos();
    // Validacion de que si exista almenos un Pedido registrado
    if (pedidos.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen Pedidos registradas ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona una Pedido para Editar:',
        choices: pedidos.map(pedido => ({ name: pedido.nombre, value: pedido._id }))
    }
    ]);

    const nuevosDatos= await solictarDatosPedido()
    await Pedido.setPedido(nuevosDatos.clienteId, nuevosDatos.total, nuevosDatos.pizzas, nuevosDatos.repartidorId);
    console.log(chalk.blue('✏️ Se modifico el Pedido correctamente ✏️'));
    await esperarTecla();
};

// Eliminar Pedido
async function eliminarPedido(){
    // Obtenermos las Pedidos actuales
    const pedidos = await Pedido.getPedidos()
    // Validacion de que si exista almenos un Pedido registrado
    if (pedidos.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen Pedidos registradas ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona una Pedido para Eliminar:',
        choices: pedidos.map(pedido => ({ name: pedido.nombre, value: pedido._id }))
    }
    ]);
    await Pedido.deletePedido(id);
    console.log(chalk.red('🗑️ Se Elimino el Pedido correctamente 🗑️'));
    await esperarTecla();
};

export { realizarPedido, crearPedido, listarPedidos, editarPedido, eliminarPedido };