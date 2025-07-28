# 🍕 Pizza y Punto

Aplicación de consola para la gestión operativa de la cadena de pizzerías **Pizza y Punto**, diseñada con Node.js y MongoDB.

## 📌 Descripción

Este sistema permite registrar pedidos, gestionar inventario, asignar repartidores y consultar estadísticas de ventas usando `Aggregation Framework`. Implementa transacciones atómicas para garantizar la consistencia de datos y está modularizado para escalar fácilmente.

---

## 🧰 Tecnologías utilizadas

- Node.js (estructura modular con ES modules)
- MongoDB
- Librerías:
  - `inquirer` (entrada por consola)
  - `mongodb` (driver oficial)
  - `dotenv` (manejo de variables de entorno)
  - `colors`, `figlet`, `chalk` (interfaz CLI amigable)

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Brian-s47/Pizza-y-Punto
cd pizza-y-punto
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con tu cadena de conexión a MongoDB:

```env
MONGODB_URI=mongodb+srv://<usuario>:<password>@<tu_cluster>.mongodb.net/pizzaypunto
```

---

## 🚀 Cómo ejecutar la aplicación

Desde la raíz del proyecto, ejecuta:

```bash
node index.js
```

Sigue el menú interactivo que te permitirá:

- Registrar pedidos
- Ver el inventario
- Ver reportes de ventas
- Agregar pizzas, ingredientes, clientes y repartidores

---

## 🧾 Comandos disponibles en la aplicación

A través del menú por consola puedes acceder a:

- 📥 **Realizar pedido** – Registra un pedido completo con cliente, pizzas y asigna un repartidor.
- 🍕 **Agregar pizza** – Crea una nueva pizza con ingredientes asociados.
- 🧀 **Agregar ingrediente** – Agrega o repone stock de un ingrediente.
- 🛵 **Agregar repartidor** – Añade un repartidor con zona de entrega.
- 👤 **Registrar cliente** – Guarda un nuevo cliente.
- 📊 **Ver reportes de ventas** – Muestra estadísticas a través de consultas agregadas.
- 📦 **Ver inventario** – Lista de ingredientes y su stock disponible.
- ❌ **Salir** – Cierra la aplicación.

---

## 🔁 Transacciones implementadas

La función `realizarPedido(clienteId, pizzaIds[])` ejecuta los siguientes pasos en **una única transacción**:

1. Verifica stock suficiente de cada ingrediente requerido.
2. Resta del inventario las unidades necesarias.
3. Registra el pedido con los detalles del cliente, pizzas, fecha y total.
4. Asigna automáticamente un repartidor disponible y actualiza su estado a “ocupado”.

> Si alguna validación falla (stock insuficiente, sin repartidores disponibles, etc.), **toda la operación se revierte automáticamente** garantizando consistencia.

---

## 📈 Consultas con Aggregation Framework

Las siguientes funciones usan MongoDB Aggregation Pipeline:

1. 🔝 **Ingredientes más usados**:
   - Consulta los ingredientes más comunes en los pedidos del último mes.

2. 💰 **Promedio de precios por categoría de pizza**:
   - Muestra el promedio de precios agrupados por categoría (vegana, tradicional, etc.).

3. 🥇 **Categoría más vendida**:
   - Identifica la categoría de pizzas con más ventas históricas.

> Todas las consultas muestran resultados en consola de forma clara y legible.

---

## 🗂️ Estructura del proyecto

```
📦 pizza-y-punto
├── 📁 controllers
├── 📁 database
├── 📁 models
├── 📁 services
├── 📁 utils
├── index.js
├── .env.example
├── .gitignore
└── README.md
```

---

## ✅ Requisitos cumplidos

- ✔️ Aplicación por consola
- ✔️ Uso de transacciones
- ✔️ Consultas con agregaciones
- ✔️ Modularización de código
- ✔️ Manejo de errores
- ✔️ CLI interactiva
- ✔️ `.gitignore` configurado correctamente

---

## 📅 Fecha de entrega

28 de julio de 2025 – 10:00 a.m.

---
