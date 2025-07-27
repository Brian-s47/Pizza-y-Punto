// Zona de importacion de librerias
import inquirer from 'inquirer';
import _ from 'lodash';

// Zona de importacion de modulos
import { gestorClientes }  from '../cli/menus.js'
import { crearCliente, listarClientes, editarCliente, eliminarCliente}  from '../controllers/clientesControler.js'
import { validarFormatoTelefono, validarTextoNoVacioNiSimbolos, validarFormatoDireccion } from '../utils/validators.js';

// Funciones generales
// Solicitar datos
async function solictarDatosCliente() {
    const { nombre, telefono, direccion } = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: 'Nombre del Cliente:',
            validate: validarTextoNoVacioNiSimbolos
        },
        {
            type: 'input',
            name: 'telefono',
            message: 'Telefono del cliente:',
            validate: validarFormatoTelefono
        },
        {
            type: 'input',
            name: 'direccion',
            message: 'Direccion del Cliente:',
            validate: validarFormatoDireccion
        }
    ]);

    return {
        nombre,
        telefono: parseInt(telefono),
        direccion
    };
}

// Zona de Funciones de servicios
async function gestionarCliente() {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorClientes();

        switch (opcion) {
            case '1':
            const datosCliente = await solictarDatosCliente();
            await crearCliente(datosCliente.nombre, datosCliente.telefono, datosCliente.direccion);
            // console.log('Se iniciara Menu de: Crear Cliente');
            //await esperarTecla();
            break;
            case '2':
            await editarCliente();
            // console.log('Se iniciara Menu de: Modificar Cliente');
            // await esperarTecla();
            break;
            case '3':
            await listarClientes();
            // console.log('Se iniciara Menu de: Listar Clientes');
            // await esperarTecla();
            break;
            case '4':
            await eliminarCliente();
            // console.log('Se iniciara Menu de: Eliminar Cliente');
            // await esperarTecla();
            break;
            case '5':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior🛠️');
            break;
        }
    }
}



export { gestionarCliente, solictarDatosCliente };