# Taller – “Pizza y Punto”

### Contexto

La cadena de pizzerías **“Pizza y Punto”** ha tenido un crecimiento acelerado y ahora desea llevar un mejor control sobre los pedidos, el inventario y el desempeño de sus ventas. Hasta ahora, todo lo hacían a mano: lápiz, papel y llamadas. Pero el caos reina en la cocina. Los repartidores están peleando por entregas duplicadas, los ingredientes se acaban sin previo aviso y no hay forma de saber cuál pizza es la más popular.

Tu misión es construir una **aplicación por consola en Node.js** que resuelva estos problemas, utilizando **MongoDB** como base de datos y aprovechando dos herramientas poderosas:

- **Aggregation Framework**: para obtener reportes de ventas e ingredientes.
- **Transacciones**: para garantizar que un pedido afecte múltiples colecciones de forma segura.

---

## Objetivos

Desarrollar un sistema modularizado que permita:

- Registrar pedidos completos de clientes.
- Controlar el inventario de ingredientes.
- Asignar repartidores de forma automatizada.
- Analizar los datos de ventas y tendencias usando agregaciones.

Todo esto con una interfaz de línea de comandos, utilizando Node.js, `inquirer`, y conexión a MongoDB con `mongodb`.

---

## Estructura de datos sugerida

Diseña tu modelo de datos como mejor se ajuste a la lógica, pero debe contemplar **al menos** las siguientes entidades:

### 🧀 `ingredientes`

- `nombre`: String
- `tipo`: String (queso, salsa, topping, etc.)
- `stock`: Number (unidades disponibles)

### 🍕 `pizzas`

- `nombre`: String
- `categoria`: String (tradicional, especial, vegana, etc.)
- `precio`: Number
- `ingredientes`: [referencias o arrays de objetos]

### 📦 `pedidos`

- `clienteId`
- `pizzas`: lista de pizzas pedidas
- `total`: valor total
- `fecha`: timestamp
- `repartidorAsignado`: referencia

### 🛵 `repartidores`

- `nombre`
- `zona`
- `estado`: disponible / ocupado

### 👤 `clientes`

- `nombre`
- `telefono`
- `direccion`

---

## Parte 1: Transacciones

Implementa una función `realizarPedido(clienteId, pizzaIds[])` que ejecute lo siguiente como una **transacción**:

1. Verifica que todos los ingredientes requeridos estén disponibles en stock.
2. Resta del inventario la cantidad usada por las pizzas del pedido.
3. Registra el pedido completo con pizzas, cliente y total.
4. Asigna automáticamente un repartidor disponible, y actualiza su estado a **ocupado**.

Si alguna parte falla (por ejemplo, falta de ingredientes o repartidores), **todo el pedido debe revertirse automáticamente**.

---

## Parte 2: Consultas con Aggregation Framework

Crea funciones en la aplicación que usen el **Aggregation Framework** para resolver:

1. ¿Cuáles son los **ingredientes más utilizados** en los pedidos del último mes?
2. ¿Cuál es el **promedio de precios por categoría de pizza**?
3. ¿Qué **categoría de pizzas** ha tenido más ventas históricas?

Cada función debe mostrar los resultados en consola de forma clara y legible.

---

## Tecnologías y herramientas requeridas

- Node.js (estructura modular)
- MongoDB
- `inquirer` para entrada de datos
- `mongodb` para la conexión y gestión de transacciones
- `.gitignore` bien definido (excluyendo `node_modules`, etc.)

---

## Entrega

- **Formato**: Repositorio en GitHub (1 por grupo).
- **Enlace**: Debe enviarse antes de la fecha límite por el medio indicado.
- **.gitignore**: Asegúrate de excluir archivos innecesarios (`node_modules`, archivos de configuración locales).
- **README.md**: Incluye:
    - Descripción del sistema.
    - Instrucciones claras para ejecutar la aplicación desde consola.
    - Descripción de los comandos disponibles.
    - Cómo se estructuran las transacciones.
    - Ejemplos de uso de las consultas con Aggregation.

### Trabajo en grupo:

- Mínimo: 1 persona
- Máximo: 3 personas por grupo

## Fecha de entrega

28 de julio de 2025  a las 10 a.m.