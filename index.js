// Zona de importacion de librerias


// Zona de  importacion de modulos
import connection from './src/db/conexion.js';
import {menuPrincipal, esperarTecla}  from './src/cli/menus.js';
import {gestionAdministrador} from './src/services/administradorService.js'


// Codigo principal de ejecucion:

async function main() {
  let salir = false;

  while (!salir) {
    const opcionPrincipal = await menuPrincipal();
    switch (opcionPrincipal) { 
      case '1':
        await gestionAdministrador();
        // console.log('Menu de Gestion de Empleado')
        // await esperarTecla()
        break;
      case '2':
        console.log('Menu de Gestion de Empleado')
        await esperarTecla()
        break;
      case '3':
        salir = true;
        console.log('🍕 Esta saliendo del sistema de gestion de la Pizeria: "Pizza y Punto" 🍕');
        await esperarTecla()
        exit;
    }


  }
}

main();


// Prueba de conexion a BD
// connection();