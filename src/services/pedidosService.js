// Zona de importacion de librerias
import inquirer from 'inquirer';
import _ from 'lodash';

// Zona de importacion de modulos
import Pedido from '../models/Pedido.js';
import Repartidor from '../models/Repartidor.js';
import Cliente from '../models/Cliente.js';
import Pizza from '../models/Pizza.js';
import Ingrediente from '../models/Ingrediente.js';
import { gestorPedidos, esperarTecla}  from '../cli/menus.js'
import { crearPedido, editarPedido, listarPedidos, eliminarPedido }  from '../controllers/pedidosControler.js'
import { getPizzasDisponibles }  from '../utils/gettersMultiplesBD.js'

// Funciones generales
// Solicitar datos
async function solictarDatosPedido() {
    // Seleccion de cliente
    const clientesActuales = await Cliente.getClientes();
    const clienteSeleccionado = await inquirer.prompt({ 
        type: 'list',
        name: 'clienteId',
        message: 'Cliente:',
        choices: clientesActuales,
        //validate: // Validar que seleccione al menos una pizza
    });
    // Seleccion de tipo de pizzas
    const pizzasDisponibles = await getPizzasDisponibles();
    const seleccionPizza = await inquirer.prompt({       
        type: 'checkbox',
        name: 'seleccionPizza',
        message: 'Selecciones las pizzas qeu desea:',
        choices: pizzasDisponibles
    });
    // Creacion de array de pizzas seleccionadas
    const pizzasSeleccionadas = seleccionPizza.map(id => pizzasDisponibles.find(p => p._id.toString() === id));
    // Seleccion de cantidad de pizza por tipo seleccionado
    const cantidades = {};
    for (const pizza of seleccionPizza) {
    const { cantidad } = await inquirer.prompt({
        type: 'number',
        name: 'cantidad',
        message: `¿Cuántas unidades deseas de ${pizza.nombre}?`,
        validate: val => val > 0 || 'Debe ser un número mayor a 0'
    });
    cantidades[pizza._id] = cantidad;
    }
    // Total de precio de pizzas
    const total = pizzasSeleccionadas.reduce((sum, p) => sum + (p.precio * cantidades[p._id]), 0);
    //Filtrado para Repartidores disponibles
    const repartidoresDisponibles = await Repartidor.getRepartidoresDisponibles();
    const repartidorSeleccionado = await inquirer.prompt({ 
        type: 'list',
        name: 'repartidorId',
        message: 'Seleccione Repartidor disponible y adecuado a zona de cliente:',
        choices: repartidoresDisponibles
    });

    return {
        clienteSeleccionado,
        seleccionPizza,
        total,
        repartidorSeleccionado
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
            await crearPedido(datosPedido.clienteId, datosPedido.pizzas, datosPedido.repartidorId);
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