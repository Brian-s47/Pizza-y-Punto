// Zona de importaciones:
// require('dotenv').config(); // Configuracion de vaiables de conexion para Mongo
import * as dotenv from 'dotenv' // Configuracion de vaiables de conexion para Mongo
import {MongoClient} from 'mongodb'; // Importacion de libreria de MongoDB

dotenv.config();
// Variable uri para control de conexion con db por medio de mongo
const uri = process.env.MONGO_URI
const nombreDB = "Pizza_y_Punto"; // nombre de la DB
const cliente = new MongoClient(uri); // creacion de cliente segun "uri"

// Funcion para coneccion a BD
export default async function connection() {
    try {
        await cliente.connect();
        console.log("✅ Conectado a MongoDB con éxito");
        return cliente.db(nombreDB);
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error.message);
        process.exit(1); // Detiene el programa de forma controlada
    }
}