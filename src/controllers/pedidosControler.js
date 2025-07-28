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

// Zona de Funciones de servicios

// Realizar pedido (Transaccion)

async function realizarPedido({ clienteId, pizzas, total, repartidorId }) {
  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      const db = client.db("Pizza y Punto");

      // 1. Validar stock y acumular ingredientes
      const pizzasDocs = await db.collection('pizzas')
        .find({ _id: { $in: pizzas.map(p => p.pizzaId) } })
        .toArray();

      const ingredientesRequeridos = {};

      for (const { pizzaId, cantidad } of pizzas) {
        const pizza = pizzasDocs.find(p => p._id.toString() === pizzaId.toString());
        pizza.ingredientes.forEach(idIng => {
          const id = idIng.toString();
          ingredientesRequeridos[id] = (ingredientesRequeridos[id] || 0) + cantidad;
        });
      }

      // 2. Verificar y restar stock
      for (const [id, cantidad] of Object.entries(ingredientesRequeridos)) {
        const ingrediente = await db.collection('ingredientes').findOne({ _id: new ObjectId(id) }, { session });
        if (!ingrediente || ingrediente.stock < cantidad) {
          throw new Error(`Ingrediente insuficiente: ${ingrediente?.nombre || id}`);
        }

        await db.collection('ingredientes').updateOne(
          { _id: new ObjectId(id) },
          { $inc: { stock: -cantidad } },
          { session }
        );
      }

      // 3. Crear pedido
      await db.collection('pedidos').insertOne({
        clienteId: new ObjectId(clienteId),
        pizzas: pizzas.map(p => ({ pizzaId: p.pizzaId, cantidad: p.cantidad })),
        total,
        fecha: new Date(),
        repartidorAsignado: new ObjectId(repartidorId)
      }, { session });

      // 4. Marcar repartidor como ocupado
      await db.collection('repartidores').updateOne(
        { _id: new ObjectId(repartidorId) },
        { $set: { estado: "ocupado" } },
        { session }
      );
    });

    console.log("✅ Pedido procesado correctamente");

  } catch (error) {
    console.error("❌ Error en transacción:", error.message);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}

// Crear un Pedido
async function crearPedido(clienteId, total, pizzas, repartidorId){
    const pedido = new Pedido(clienteId, total, pizzas, repartidorId) // Instanciamos pedido
    const db = await connection(); // Conectamos con la BD y la traemos
    const coleccion = db.collection("pedidos"); // Traemos la coleccion de pedidos de la BD
    await coleccion.insertOne(pedido); // insertamos el nuevo pedido creada
    console.log(`Se a creado correctamente el pedido`); // Mensaje de correcta creacion de pedido
    await esperarTecla();
}   

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
}

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
}

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