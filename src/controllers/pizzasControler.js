// Zona de importacion de librerias
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';

// Zona de importacion de modulos
import Pizza from '../models/Pizza.js';
import connection from '../db/conexion.js'
import {esperarTecla}  from '../cli/menus.js'
import {solictarDatosPizza} from '../services/pizzasService.js'

// Zona de Funciones de servicios
// Crear un ingrediente
async function crearPizza(nombre, categoria, precio, ingredientes){
    const pizza = new Pizza(nombre, categoria, precio, ingredientes) // Instanciamos pizza
    const db = await connection(); // Conectamos con la BD y la traemos
    const coleccion = db.collection("pizzas"); // Traemos la coleccion de Pizzas de la BD
    await coleccion.insertOne(pizza); // insertamos la nueva pizza creada
    console.log(`Se a creado correctamente la Pizza ${nombre}`); // Mensaje de correcta creacion de pizza
    await esperarTecla();
}   

// Listar Pizzas
async function listarPizza(){
    // Obtenermos las pizas actuales
    const pizzas = await Pizza.getPizzas()
    // Validacion si existen Pizzas
    if(pizzas.lenhgth === 0){
        console.log(`No se tienen Pizzas registradas`); // Mensaje de error no existen Pizzas en la BD
    } else{
        const titulo = chalk.bold.cyan('📋 Listado de Pizzas') 
          console.log(boxen(titulo, {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'green',
                align: 'center'
            }));
        const linea = chalk.gray('────────────────────────────────────────────')
        console.log(titulo)
        // Convercion para array de ingredientes imprimir correctamente
        const pizzasVisibles = pizzas.map(({ _id, id, ingredientes, ...rest }) => ({
            ...rest,
            ingredientes: Array.isArray(ingredientes)
            ? ingredientes.join(' , ')
            : 'Sin ingredientes'
        }));

        console.table(pizzasVisibles)
        console.log(linea);
        await esperarTecla();
    }
}

// Editar Pizzas
async function editarPizza(){
    // Obtenermos las Pizzas actuales
    const pizzas = await Pizza.getPizzas();
    // Validacion de que si exista almenos una Pizza registrada
    if (pizzas.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen Pizzas registradas ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona una Pizza para Editar:',
        choices: pizzas.map(pizza => ({ name: pizza.nombre, value: pizza._id }))
    }
    ]);

    const nuevosDatos= await solictarDatosPizza()
    await Pizza.setPizza(id, nuevosDatos.nombre, nuevosDatos.categoria, nuevosDatos.precio, nuevosDatos.ingredientes);
    console.log(chalk.blue('✏️ Se modifico la Pizza correctamente ✏️'));
    await esperarTecla();
}

// Eliminar Pizza
async function eliminarPizza(){
    // Obtenermos las Pizzas actuales
    const pizzas = await Pizza.getPizzas()
    // Validacion de que si exista almenos una Pizza registrada
    if (pizzas.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen Pizzas registradas ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona una Pizza para Eliminar:',
        choices: pizzas.map(pizza => ({ name: pizza.nombre, value: pizza._id }))
    }
    ]);
    await Pizza.deletePizza(id);
    console.log(chalk.red('🗑️ Se Elimino la Pizza correctamente 🗑️'));
    await esperarTecla();
};



export { crearPizza, listarPizza, editarPizza, eliminarPizza };