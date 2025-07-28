// Zona de importacion de librerias
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';

// Zona de importacion de modulos
import Cliente from '../models/Cliente.js';
import connection from '../db/conexion.js'
import {esperarTecla}  from '../cli/menus.js'
import {solictarDatosCliente} from '../services/clientesService.js'

// Zona de Funciones de servicios
// Crear un Cliente
async function crearCliente(nombre, telefono, direccion){
    const cliente = new Cliente(nombre, telefono, direccion) // Instanciamos Cliente
    const db = await connection(); // Conectamos con la BD y la traemos
    const coleccion = db.collection("clientes"); // Traemos la coleccion de clientes de la BD
    await coleccion.insertOne(cliente); // insertamos el nuevo cliente creado
    console.log(`Se a creado correctamnete el cliente ${nombre}`); // Mensaje de correcta creacion de cliente
    await esperarTecla();
}   

// Listar Clientes
async function listarClientes(){
    // Obtenermos los clientes actuales
    const clientes = await Cliente.getClientes()
    // Validacion si existen clientes
    if(clientes.lenhgth === 0){
        console.log(`No se tienen clientes registrados`); // Mensaje de error no existen clientes
        await esperarTecla();
    } else{
        const titulo = chalk.bold.cyan('📋 Listado de clientes') 
          console.log(boxen(titulo, {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'green',
                align: 'center'
            }));
        const linea = chalk.gray('────────────────────────────────────────────')
        console.log(titulo)
        const clientesVisibles = clientes.map(({ _id, id, ...rest }) => rest);
        console.table(clientesVisibles)
        console.log(linea);
        await esperarTecla();
    }
}

// Editar clientes
async function editarCliente(){
    // Obtenermos los clientes actuales
    const clientes = await Cliente.getClientes()
    // Validacion de que si exista almenos un cliente registrado
    if (clientes.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen clientes registrados ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona un cliente para Editar:',
        choices: clientes.map(cliente => ({ name: cliente.nombre, value: cliente._id }))
    }
    ]);

    const nuevosDatos= await solictarDatosCliente()
    await Cliente.setCliente(nuevosDatos.nombre, nuevosDatos.telefono, nuevosDatos.direccion);
    console.log(chalk.blue('✏️ Se modifico el cliente correctamente ✏️'));
    await esperarTecla();
}

// Eliminar cliente
async function eliminarCliente(){
    // Obtenermos los clientes actuales
    const clientes = await Cliente.getClientes()
    // Validacion de que si exista almenos un cliente registrado
    if (clientes.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen clientes registrados ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona un cliente para Eliminar:',
        choices: clientes.map(cliente => ({ name: cliente.nombre, value: cliente._id }))
    }
    ]);
    await Cliente.deleteCliente(id);
    console.log(chalk.red('🗑️ Se Elimino el cliente correctamente 🗑️'));
    await esperarTecla();
};



export { crearCliente, listarClientes, editarCliente, eliminarCliente };