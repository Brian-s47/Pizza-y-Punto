// Zona de importacion de librerias
import inquirer from 'inquirer';
import _ from 'lodash';

// Zona de importacion de modulos
import Ingrediente from '../models/Ingrediente.js';
import { gestorPizzas, esperarTecla}  from '../cli/menus.js'
import { crearPizza, editarPizza, listarPizza,  eliminarPizza}  from '../controllers/pizzasControler.js'
import { validarTextoNoVacioNiSimbolos, validarNumeroPositivo } from '../utils/validators.js';

// Funciones generales
// Solicitar datos
async function solictarDatosPizza() {
    //Traer la lista de Ingredientes Actuales
    const ingredientesActuales = await Ingrediente.getIngredientes();
    //Filtrado para ingredientes con stock disponible
    const ingredientesDisponibles = ingredientesActuales
        .filter(ing => ing.stock > 0)
        .map(ing => ({
        name: `${ing.nombre} (${ing.tipo}) - Stock: ${ing.stock}`,
        value: ing.nombre
    }));
    const { nombre, categoria, precio, ingredientes } = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: 'Nombre de la Pizza:',
            validate: validarTextoNoVacioNiSimbolos
        },
        {
            type: 'list',
            name: 'categoria',
            message: 'Categoria de Pizza:',
            choices: ['tradicional', 'especial', 'vegana']
        },
        {
            type: 'input',
            name: 'precio',
            message: 'Precio de la Pizza:',
            validate: validarNumeroPositivo,
        },
        {
            type: 'checkbox',
            name: 'ingredientes',
            message: 'Lista de ingredientes para la Pizza:',
            choices: ingredientesDisponibles
        }
    ]);

    return {
        nombre,
        categoria,
        precio: parseInt(precio),
        ingredientes
    };
}
// Zona de Funciones de servicios
async function gestionarPizzas() {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorPizzas();

        switch (opcion) {
            case '1':
            const datosPizza = await solictarDatosPizza();
            await crearPizza(datosPizza.nombre, datosPizza.categoria, datosPizza.precio, datosPizza.ingredientes);
            // console.log('Se iniciara Menu de: Crear Pizza');
            //await esperarTecla();
            break;
            case '2':
            await editarPizza();
            // console.log('Se iniciara Menu de: Modificar Pizza');
            // await esperarTecla();
            break;
            case '3':
            await listarPizza();
            // console.log('Se iniciara Menu de: Listar Pizzas');
            // await esperarTecla();
            break;
            case '4':
            await eliminarPizza();
            // console.log('Se iniciara Menu de: Eliminar Pizza');
            // await esperarTecla();
            break;
            case '5':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior🛠️');
            break;
        }
    }
}



export { gestionarPizzas, solictarDatosPizza };