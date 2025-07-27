// Zona de importacion de librerias
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';

// Zona de importacion de modulos
import Ingrediente from '../models/Ingrediente.js';
import connection from '../db/conexion.js'
import {esperarTecla}  from '../cli/menus.js'
import {solictarDatosIngrediente} from '../services/ingredientesService.js'

// Zona de Funciones de servicios
// Crear un ingrediente
async function crearIngrediente(id, nombre, tipo, stock){
    const ingrediente = new Ingrediente(id, nombre, tipo, stock) // Instanciamos ingrediente
    const db = await connection(); // Conectamos con la BD y la traemos
    const coleccion = db.collection("ingredientes"); // Traemos la coleccion de ingredientes de la BD
    await coleccion.insertOne(ingrediente); // insertamos el nuevo ingredinete creado
    console.log(`Se a creado correctamnete el ingrediente ${nombre}`); // Mensaje de correcta creacion de ingrediente
    await esperarTecla();
}   

// Listar ingredientes
async function listarIngrediente(){
    // Obtenermos los ingredientes actuales
    const ingredientes = await Ingrediente.getIngredientes()
    // Validacion si existen ingredientes
    if(ingredientes.lenhgth === 0){
        console.log(`No se tienen ingredientes registrados`); // Mensaje de error no existen ingredientes
    } else{
        const titulo = chalk.bold.cyan('📋 Listado de ingredientes') 
          console.log(boxen(titulo, {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'green',
                align: 'center'
            }));
        const linea = chalk.gray('────────────────────────────────────────────')
        console.log(titulo)
        const ingredientesVisibles = ingredientes.map(({ _id, id, ...rest }) => rest);
        console.table(ingredientesVisibles)
        console.log(linea);
        await esperarTecla();
    }
}

// Editar ingredientes
async function editarIngrediente(){
    // Obtenermos los ingredientes actuales
    const ingredientes = await Ingrediente.getIngredientes()
    // Validacion de que si exista almenos un ingrediente registrado
    if (ingredientes.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen ingredientes registrados ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona un ingrediente para Editar:',
        choices: ingredientes.map(ingrediente => ({ name: ingrediente.nombre, value: ingrediente._id }))
    }
    ]);

    const nuevosDatos= await solictarDatosIngrediente()
    await Ingrediente.setIngrediente(id, nuevosDatos.nombre, nuevosDatos.tipo, nuevosDatos.stock);
    console.log(chalk.blue('✏️ Se modifico el ingrediente correctamente ✏️'));
    await esperarTecla();
}

// Eliminar ingredientes
async function eliminarIngrediente(){
    // Obtenermos los ingredientes actuales
    const ingredientes = await Ingrediente.getIngredientes()
    // Validacion de que si exista almenos un ingrediente registrado
    if (ingredientes.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen ingredientes registrados ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona un ingrediente para Eliminar:',
        choices: ingredientes.map(ingrediente => ({ name: ingrediente.nombre, value: ingrediente._id }))
    }
    ]);
    await Ingrediente.deleteIngrediente(id);
    console.log(chalk.red('🗑️ Se Elimino el ingrediente correctamente 🗑️'));
    await esperarTecla();
};



export { crearIngrediente, listarIngrediente, editarIngrediente, eliminarIngrediente };