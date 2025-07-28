// Zona de importacion de librerias
import inquirer from 'inquirer';
import _ from 'lodash';

// Zona de importacion de modulos
import { gestorIngredientes}  from '../cli/menus.js'
import { crearIngrediente, listarIngredientes, editarIngrediente, eliminarIngrediente}  from '../controllers/ingredientesControler.js'
import { validarTextoNoVacioNiSimbolos, validarNumeroPositivo } from '../utils/validators.js';

// Funciones generales
// Solicitar datos
async function solictarDatosIngrediente() {
    const { nombre, tipo, stock } = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: 'Nombre del Ingrediente:',
            validate: validarTextoNoVacioNiSimbolos
        },
        {
            type: 'list',
            name: 'tipo',
            message: 'Tipo de Ingrediente:',
            choices: ['Vegetal', 'Salsa', 'Queso', 'Topping', 'Otros']
        },
        {
            type: 'input',
            name: 'stock',
            message: 'Stock del Ingrediente:',
            validate: validarNumeroPositivo
        }
    ]);

    return {
        nombre,
        tipo,
        stock: parseInt(stock)
    };
}

// Zona de Funciones de servicios
async function gestionarIngrediente() {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorIngredientes();

        switch (opcion) {
            case '1':
            const datosIngrediente = await solictarDatosIngrediente();
            await crearIngrediente(datosIngrediente.nombre, datosIngrediente.tipo, datosIngrediente.stock);
            // console.log('Se iniciara Menu de: Crear Ingrediente');
            //await esperarTecla();
            break;
            case '2':
            await editarIngrediente();
            // console.log('Se iniciara Menu de: Modificar Ingrediente');
            // await esperarTecla();
            break;
            case '3':
            await listarIngredientes();
            // console.log('Se iniciara Menu de: Listar Ingredientes');
            // await esperarTecla();
            break;
            case '4':
            await eliminarIngrediente();
            // console.log('Se iniciara Menu de: Eliminar Ingredientes');
            // await esperarTecla();
            break;
            case '5':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior🛠️');
            break;
        }
    }
}



export { gestionarIngrediente, solictarDatosIngrediente };