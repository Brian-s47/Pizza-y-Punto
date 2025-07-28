// Zona de importacion de librerias
import inquirer from 'inquirer';
import _ from 'lodash';

// Zona de importacion de modulos
import Repartidor from '../models/Repartidor.js';
import Cliente from '../models/Cliente.js';
import Pizza from '../models/Pizza.js';
import { gestorPedidos, esperarTecla}  from '../cli/menus.js';
import { realizarPedido, editarPedido, listarPedidos, eliminarPedido }  from '../controllers/pedidosControler.js';
import { getPizzasDisponibles }  from '../utils/gettersMultiplesBD.js';

// Funciones generales
// Solicitar datos
async function solictarDatosPedido() {
  // Cliente
  const clientesActuales = await Cliente.getClientes();
  const { clienteId } = await inquirer.prompt({ 
    type: 'list',
    name: 'clienteId',
    message: 'Cliente:',
    choices: clientesActuales.map(c => ({
      name: c.nombre,
      value: c._id.toString()
    }))
  });

  // Pizzas
  const pizzasDisponibles = await Pizza.getPizzas();
  if (!pizzasDisponibles.length) {
    console.log("❌ No hay pizzas disponibles con ingredientes suficientes.");
    return;
  }

  const { seleccionPizza } = await inquirer.prompt({       
    type: 'checkbox',
    name: 'seleccionPizza',
    message: 'Selecciones las pizzas que desea:',
    choices: pizzasDisponibles.map(p => ({
      name: `${p.nombre} (${p.categoria}) - $${p.precio}`,
      value: p._id.toString()
    }))
  });

  const pizzasSeleccionadas = seleccionPizza.map(id =>
    pizzasDisponibles.find(p => p._id.toString() === id)
  );

  const cantidades = {};
  for (const pizza of pizzasSeleccionadas) {
    const { cantidad } = await inquirer.prompt({
      type: 'number',
      name: 'cantidad',
      message: `¿Cuántas unidades deseas de ${pizza.nombre}?`,
      validate: val => val > 0 || 'Debe ser un número mayor a 0'
    });
    cantidades[pizza._id.toString()] = cantidad;
  }

  const total = pizzasSeleccionadas.reduce((sum, p) =>
    sum + (p.precio * cantidades[p._id.toString()]), 0);

  // Repartidor
  const repartidoresDisponibles = await Repartidor.getRepartidoresDisponibles();
  const { repartidorId } = await inquirer.prompt({
    type: 'list',
    name: 'repartidorId',
    message: 'Seleccione repartidor:',
    choices: repartidoresDisponibles.map(rep => ({
      name: `${rep.nombre} - Zona: (${rep.zona})`,
      value: rep._id.toString()
    }))
  });

  return {
    clienteId,
    pizzas: pizzasSeleccionadas.map(p => ({
      pizzaId: p._id,
      cantidad: cantidades[p._id.toString()]
    })),
    total,
    repartidorId
  };
}
// Zona de Funciones de servicios
async function gestionarPedidos() {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorPedidos();

        switch (opcion) {
            case '1':
            const datosPedido = await solictarDatosPedido();
            if (!datosPedido) {
                console.log("⚠️ No se pudo generar el pedido.");
                await esperarTecla();
                return;
            }
            await realizarPedido(datosPedido.clienteId, datosPedido.pizzas, datosPedido.total, datosPedido.repartidorId);
            // console.log('Se iniciara Menu de: Crear Pedido');
            //await esperarTecla();
            break;
            case '2':
            await editarPedido();
            // console.log('Se iniciara Menu de: Modificar Pedido');
            // await esperarTecla();
            break;
            case '3':
            await listarPedidos();
            // console.log('Se iniciara Menu de: Listar Pedidos');
            // await esperarTecla();
            break;
            case '4':
            await eliminarPedido();
            // console.log('Se iniciara Menu de: Eliminar Pedido');
            // await esperarTecla();
            break;
            case '5':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior🛠️');
            break;
        }
    }
}


export { gestionarPedidos, solictarDatosPedido };