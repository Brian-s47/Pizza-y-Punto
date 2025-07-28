// Zona de importacion de librerias
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';
import { ObjectId } from 'mongodb';

// Zona de importacion de modulos
import Pizza from '../models/Pizza.js';
import connection from '../db/conexion.js'
import {esperarTecla}  from '../cli/menus.js'
import {solictarDatosPizza} from '../services/pizzasService.js'

// Zona de Funciones de servicios
// Crear un ingrediente
async function crearPizza(nombre, categoria, precio, ingredientesIds){
  const db = await connection();
  const coleccion = db.collection('pizzas');

  const ingredientesObjectId = ingredientesIds.map(id => new ObjectId(id));

  await coleccion.insertOne({
    nombre,
    categoria,
    precio,
    ingredientes: ingredientesObjectId
  });

  console.log(`✅ Se creó correctamente la Pizza ${nombre}`);
  await esperarTecla();
}   

// Listar Pizzas
async function listarPizza() {
  const db = await connection();

  const pizzas = await db.collection('pizzas').aggregate([
    {
      $lookup: {
        from: 'ingredientes',
        localField: 'ingredientes',
        foreignField: '_id',
        as: 'ingredientes_detalle'
      }
    }
  ]).toArray();

  // Validación si existen Pizzas
  if (pizzas.length === 0) {
    console.log(`❌ No se tienen Pizzas registradas`);
    await esperarTecla();
    return;
  }

  const titulo = chalk.bold.cyan('📋 Listado de Pizzas');
  console.log(boxen(titulo, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    align: 'center'
  }));

  // Preparamos los datos para imprimir en tabla
  const pizzasVisibles = pizzas.map(({ nombre, categoria, precio, ingredientes_detalle }) => ({
    nombre,
    categoria,
    precio,
    ingredientes: ingredientes_detalle.length > 0
      ? ingredientes_detalle.map(ing => ing.nombre).join(', ')
      : 'Sin ingredientes'
  }));

  console.table(pizzasVisibles);
  await esperarTecla();
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