// Zona de importacion de librerias
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';

// Zona de importacion de modulos
import Repartidor from '../models/Repartidor.js';
import connection from '../db/conexion.js'
import {esperarTecla}  from '../cli/menus.js'
import {solictarDatosRepartidor} from '../services/repartidoresService.js'

// Zona de Funciones de servicios
// Crear un Repartidor
async function crearRepartidor(nombre, zona){
    const repartidor = new Repartidor(nombre, zona) // Instanciamos Repartidor
    const db = await connection(); // Conectamos con la BD y la traemos
    const coleccion = db.collection("repartidores"); // Traemos la coleccion de Repartidores de la BD
    await coleccion.insertOne(repartidor); // insertamos el nuevo Repartidor creado
    console.log(`Se a creado correctamnete el Repartidor ${nombre}`); // Mensaje de correcta creacion de Repartidor
    await esperarTecla();
}   

// Listar Repartidores
async function listarRepartidores(){
    // Obtenermos los Repartidores actuales
    const repartidores = await Repartidor.getRepartidores()
    // Validacion si existen Repartidores
    if(repartidores.lenhgth === 0){
        console.log(`No se tienen Repartidores registrados`); // Mensaje de error no existen repartidores
        await esperarTecla();
    } else{
        const titulo = chalk.bold.cyan('📋 Listado de repartidores') 
          console.log(boxen(titulo, {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'green',
                align: 'center'
            }));
        const linea = chalk.gray('────────────────────────────────────────────')
        console.log(titulo)
        const repartidoresVisibles = repartidores.map(({ _id, id, ...rest }) => rest);
        console.table(repartidoresVisibles)
        console.log(linea);
        await esperarTecla();
    }
}

// Editar clientes
async function editarRepartidor(){
    // Obtenermos los Repartidores actuales
    const repartidores = await Repartidor.getClientes()
    // Validacion de que si exista almenos un Repartidor registrado
    if (clientes.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen Repartidores registrados ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona un Repartidores para Editar:',
        choices: repartidores.map(repartidor => ({ name: repartidor.nombre, value: repartidor._id }))
    }
    ]);

    const nuevosDatos= await solictarDatosRepartidor()
    await Repartidor.setRepartidor(nuevosDatos.nombre, nuevosDatos.zona);
    console.log(chalk.blue('✏️ Se modifico el Repartidor correctamente ✏️'));
    await esperarTecla();
}

// Eliminar Repartidor
async function eliminarRepartidor(){
    // Obtenermos los Repartidores actuales
    const repartidores = await Repartidor.getRepartidores()
    // Validacion de que si exista almenos un Repartidor registrado
    if (repartidores.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen repartidores registrados ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona un repartidores para Eliminar:',
        choices: repartidores.map(repartidor => ({ name: repartidor.nombre, value: repartidor._id }))
    }
    ]);
    await Repartidor.deleteRepartidor(id);
    console.log(chalk.red('🗑️ Se Elimino el Repartidor correctamente 🗑️'));
    await esperarTecla();
};



export { crearRepartidor, listarRepartidores, editarRepartidor, eliminarRepartidor };