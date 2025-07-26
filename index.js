// Zona de importacion de librerias


// Zona de  importacion de modulos
import connection from './src/db/conexion.js';
import {menuPrincipal, gestorIngredientes, esperarTecla}  from './src/cli/menus.js';

// Codigo principal de ejecucion:

async function main() {
  let salir = false;

  while (!salir) {
    const opcion = await menuPrincipal();

    switch (opcion) {
      case '1':
        console.log('Se iniciara Menu de: Gestion de Pedidos')
        await esperarTecla()
        break;
      case '2':
        console.log('Se iniciara Menu de: Gestion de Clientes')
        await esperarTecla()
        break;
      case '3':
        console.log('Se iniciara Menu de: Gestion de Repartidores')
        await esperarTecla()
        break;
      case '4':
        console.log('Se iniciara Menu de: Gestion de Pizzas')
        await esperarTecla()
        break;
      case '5':
        await gestorIngredientes()
        console.log('Se iniciara Menu de: Gestion de Ingredientes')
        await esperarTecla()
        break;
      case '6':
        salir = true;
        console.log('🍕 Esta saliendo del sistema de gestion de la Pizeria: "Pizza y Punto" 🍕');
        await esperarTecla()
        exit;
    }
  }
}

main();


// Prueba de conexion a BD
connection();