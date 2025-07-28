// Zona de importacion de librerias
import inquirer from 'inquirer';
import _ from 'lodash';

// Zona de importacion de modulos
import { gestorAdministrador, esperarTecla}  from '../cli/menus.js';
import { gestionarPizzas } from '../services/pizzasService.js';
import { gestionarIngrediente } from '../services/ingredientesService.js';
import { gestionarCliente } from '../services/clientesService.js';
import { gestionarRepartidores } from '../services/repartidoresService.js'

// Funciones generales
// Solicitar datos
// Zona de Funciones de servicios
async function gestionAdministrador() {
    let salir = false;
    while (!salir){
    const opcion = await gestorAdministrador();
        switch (opcion) { 
        case '1':
            console.log('Se iniciara Menu de: Gestion de Pedidos')
            await esperarTecla()
            break;
        case '2':
            await gestionarCliente()
            // console.log('Se iniciara Menu de: Gestion de Clientes')
            // await esperarTecla()
            break;
        case '3':
            await gestionarRepartidores()
            // console.log('Se iniciara Menu de: Gestion de Repartidores')
            // await esperarTecla()
            break;
        case '4':
            await gestionarPizzas()
            // console.log('Se iniciara Menu de: Gestion de Pizzas')
            // await esperarTecla()
        break;
        case '5':
            await gestionarIngrediente()
            // console.log('Se iniciara Menu de: Gestion de Ingredientes')
            // await esperarTecla()
        break;
        case '6':
            console.log('🍕 Esta saliendo del Menu de Arministrador de la Pizeria: "Pizza y Punto" 🍕');
            await esperarTecla()
            exit;
        }
        break;
    }
}

export { gestionAdministrador };