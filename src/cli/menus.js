// Zona de importacion de librerias
import inquirer from 'inquirer'; //  Para interaccion con el usuario
import chalk from 'chalk' // Para dar colores a los mensajes y opciones
import boxen from 'boxen' // Para encerrar los menus en cajas 

// Zona de importacion de modulos


// Zona de Menus
// Menu principal
async function menuPrincipal() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('📋 Menu Principal Pizzeria: "Pizza y Punto"') 
  const linea = chalk.gray('────────────────────────────────────────────')
  console.log(boxen(titulo, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    align: 'center'
  }))
  console.log(linea)
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: chalk.green('1. Menu de Gestion de Administrador'), value: '1' },
        { name: chalk.blue('2. Menu de Gestion de Empleado'), value: '2' },
        { name: chalk.gray('3. Salir del sistema de gestion'), value: '3' }
      ]
    }
  ]);
  return opcion;
}
// Menu Administrador
async function gestorAdministrador() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('📋 Menu Gestor Administrador Pizzeria: "Pizza y Punto"') 
  const linea = chalk.gray('────────────────────────────────────────────')
  console.log(boxen(titulo, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    align: 'center'
  }))
  console.log(linea)
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: chalk.green('1. Gestion de Pedidos'), value: '1' },
        { name: chalk.blue('2. Gestion de Clientes'), value: '2' },
        { name: chalk.yellow('3. Gestion de Repartidores'), value: '3' },
        { name: chalk.red('4. Gestion de Pizzas'), value: '4' },
        { name: chalk.white('5. Gestion de Ingredientes'), value: '5' },
        { name: chalk.gray('6. Salir del sistema de gestion'), value: '6' }
      ]
    }
  ]);
  return opcion;
}

// Menu Gestion de Ingredientes
async function gestorIngredientes() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('🧀 Menu Gestion de Ingredientes') 
  const linea = chalk.gray('────────────────────────────────────────────')
  console.log(boxen(titulo, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    align: 'center'
  }))
  console.log(linea)
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: chalk.green('1. Crear Ingrediente'), value: '1' },
        { name: chalk.blue('2. Modificar Ingrediente'), value: '2' },
        { name: chalk.yellow('3. Listar Ingredientes'), value: '3' },
        { name: chalk.red('4. Eliminar Ingredientes'), value: '4' },
        { name: chalk.gray('5. Volver al menu anterior'), value: '5' }
      ]
    }
  ]);
  return opcion;
}

// Menu Gestion de Pizzas
async function gestorPizzas() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('🍕 Menu Gestion de Pizzas') 
  const linea = chalk.gray('────────────────────────────────────────────')
  console.log(boxen(titulo, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    align: 'center'
  }))
  console.log(linea)
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: chalk.green('1. Crear Pizza'), value: '1' },
        { name: chalk.blue('2. Modificar Pizza'), value: '2' },
        { name: chalk.yellow('3. Listar Pizzas'), value: '3' },
        { name: chalk.red('4. Eliminar Pizza'), value: '4' },
        { name: chalk.gray('5. Volver al menu anterior'), value: '5' }
      ]
    }
  ]);
  return opcion;
}

// Menu Gestion de Clientes
async function gestorClientes() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('👥 Menu Gestion de Clientes') 
  const linea = chalk.gray('────────────────────────────────────────────')
  console.log(boxen(titulo, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    align: 'center'
  }))
  console.log(linea)
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: chalk.green('1. Crear Cliente'), value: '1' },
        { name: chalk.blue('2. Modificar Cliente'), value: '2' },
        { name: chalk.yellow('3. Listar Cliente'), value: '3' },
        { name: chalk.red('4. Eliminar Cliente'), value: '4' },
        { name: chalk.gray('5. Volver al menu anterior'), value: '5' }
      ]
    }
  ]);
  return opcion;
}

// Menu Gestion de Repartidores
async function gestorRepartidores() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('🛵 Menu Gestion de Repartidores') 
  const linea = chalk.gray('────────────────────────────────────────────')
  console.log(boxen(titulo, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    align: 'center'
  }))
  console.log(linea)
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: chalk.green('1. Crear Repartidor'), value: '1' },
        { name: chalk.blue('2. Modificar Repartidor'), value: '2' },
        { name: chalk.yellow('3. Listar Repartidores'), value: '3' },
        { name: chalk.red('4. Eliminar Repartidor'), value: '4' },
        { name: chalk.gray('5. Volver al menu anterior'), value: '5' }
      ]
    }
  ]);
  return opcion;
}

// Menu Gestion de Pedidos
async function gestorPedidos() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('✅ Menu Gestion de Pedidos') 
  const linea = chalk.gray('────────────────────────────────────────────')
  console.log(boxen(titulo, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    align: 'center'
  }))
  console.log(linea)
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: chalk.green('1. Crear Pedido'), value: '1' },
        { name: chalk.blue('2. Modificar Pedido'), value: '2' },
        { name: chalk.yellow('3. Listar Pedidos'), value: '3' },
        { name: chalk.red('4. Eliminar Pedido'), value: '4' },
        { name: chalk.gray('5. Volver al menu anterior'), value: '5' }
      ]
    }
  ]);
  return opcion;
}

// Funcion para precionar tecla para continuar
async function esperarTecla() {
  await inquirer.prompt([
    {
      type: "input",
      name: "continuar",
      message: chalk.gray("\nPresiona Enter para continuar..."),
    },
  ]);
}


export { menuPrincipal, gestorAdministrador, gestorIngredientes, gestorPizzas, gestorClientes, gestorRepartidores, gestorPedidos, esperarTecla };