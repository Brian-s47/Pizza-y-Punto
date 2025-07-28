// Zona de importacion de librerias
import inquirer from 'inquirer';
import _ from 'lodash';

// Zona de importacion de modulos
import { gestorRepartidores }  from '../cli/menus.js'
import { crearRepartidor, listarRepartidores, editarRepartidor, eliminarRepartidor }  from '../controllers/repartidoresControler.js'
import { validarTextoNoVacioNiSimbolos } from '../utils/validators.js';

// Funciones generales
// Solicitar datos
async function solictarDatosRepartidor() {
    const { nombre, zona } = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: 'Nombre del Repartidor:',
            validate: validarTextoNoVacioNiSimbolos
        },
        {
            type: 'list',
            name: 'zona',
            message: 'Zona del repartidor:',
            choices: ['Piedecuesta', 'Bucaramanga', 'Floridablanca', 'Giron']
        }
    ]);

    return {
        nombre,
        zona
    };
}

// Zona de Funciones de servicios
async function gestionarRepartidores() {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorRepartidores();

        switch (opcion) {
            case '1':
            const datosRepartidor = await solictarDatosRepartidor();
            await crearRepartidor(datosRepartidor.nombre, datosRepartidor.zona);
            // console.log('Se iniciara Menu de: Crear Repartidor');
            //await esperarTecla();
            break;
            case '2':
            await editarRepartidor();
            // console.log('Se iniciara Menu de: Modificar Repartidor');
            // await esperarTecla();
            break;
            case '3':
            await listarRepartidores();
            // console.log('Se iniciara Menu de: Listar Repartidores');
            // await esperarTecla();
            break;
            case '4':
            await eliminarRepartidor();
            // console.log('Se iniciara Menu de: Eliminar Repartidor');
            // await esperarTecla();
            break;
            case '5':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior🛠️');
            break;
        }
    }
}



export { gestionarRepartidores, solictarDatosRepartidor };