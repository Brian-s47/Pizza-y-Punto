// Zona de importacion de librerias
import { ObjectId } from 'mongodb'; // Para obtener el id generado por MongoDB

// Zona de importacion de modulos
import connection from '../db/conexion.js' // Modulo de conexion a BD

// Creacion de Clase
class Ingrediente {
    constructor (id, nombre, tipo, stock){
        // Validador de clase abstracta
        if(this.constructor === Ingrediente){
            throw new Error(`El objeto enviado no es de tipo "Ingrediente"`);
        }
        //Atributos generales
        this.id = id; // Id generado por MongoDB al registrarlo
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
    // Actualizar datos de un ingrediente
    static async setIngrediente(id, nombre, tipo, stock){
        const db = await connection();
        const coleccion = db.collection('ingredientes');

        const resultado = await coleccion.updateOne(
        { _id: new ObjectId(id) }, // Buscamos el ingrediente por Id
        {
            $set: {
                nombre: nombre,
                tipo: tipo,
                stock: stock
            }
        }
    );

    return resultado.modifiedCount > 0; 
    }

}

export default Ingrediente;