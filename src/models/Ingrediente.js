// Zona de importacion de librerias
import { ObjectId } from 'mongodb'; // Para obtener el id generado por MongoDB

// Zona de importacion de modulos
import connection from '../db/conexion.js' // Modulo de conexion a BD

// Creacion de Clase
class Ingrediente {
    constructor (nombre, tipo, stock){
        //Atributos generales
        this.nombre = nombre; // Debe ser de tipo string
        this.tipo = tipo; // Debe ser de tipo string
        this.stock = stock; // Debe ser de tipo number
    }
    // Metodos

    // Geters
    // Obtener todos los ingredientes actuales
    static async getIngredientes(){
        const db = await connection(); // Conectamos con la BD y la traemos
        const coleccion = db.collection("ingredientes"); // Traemos la coleccion de ingredientes de la BD
        const ingredientes = await coleccion.find().toArray(); // traemos todos lo ingredientes y los comvertimos en Array
        return ingredientes;
    }
    // Obtener un ingrediente por Id
    static async getIngredienteId(id){
        const db = await connection();
        const coleccion = db.collection('ingredientes');
        return await coleccion.findOne({ _id: new ObjectId(id) });
    }

    // Seters

    // Agregar un Ingrediente
    // Actualizar datos de un ingrediente
    static async setIngrediente(id, nombre, tipo, stock){
        const db = await connection();
        const coleccion = db.collection('ingredientes');

        await coleccion.updateOne(
        { _id: new ObjectId(id) }, // Buscamos el ingrediente por Id
        {
            $set: {
                nombre: nombre,
                tipo: tipo,
                stock: stock
            }
        }
    );
    }

    // Eliminar Ingrediente
    static async deleteIngrediente(id){
        const db = await connection();
        const coleccion = db.collection('ingredientes');

        coleccion.deleteOne({_id: new ObjectId(id)});
    }

}

export default Ingrediente;