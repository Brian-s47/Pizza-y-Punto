// Zona de importacion de librerias
import { ObjectId } from 'mongodb'; // Para obtener el id generado por MongoDB

// Zona de importacion de modulos
import connection from '../db/conexion.js' // Modulo de conexion a BD

// Creacion de Clase
class Pizza {
    constructor (nombre, categoria, precio, ingredientes){
        //Atributos generales
        this.nombre = nombre; // Debe ser de tipo string
        this.categoria = categoria; // Debe ser de tipo string
        this.precio = precio; // Debe ser de tipo number
        this.ingredientes = [ingredientes]; // Array vacio para ingresar los ingredientes como objetos luego
    }
    // Metodos

    // Geters
    // Obtener todos los ingredientes actuales
    static async getPizzas(){
        const db = await connection(); // Conectamos con la BD y la traemos
        const coleccion = db.collection("pizzas"); // Traemos la coleccion de pizzas de la BD
        const pizzas = await coleccion.find().toArray(); // traemos todas las pizzas y los comvertimos en Array
        return pizzas; // Devolvemos el array de pizzas obtenido
    }
    // Obtener una pizza por Id
    static async getPizzaId(id){
        const db = await connection();
        const coleccion = db.collection('pizzas');
        return await coleccion.findOne({ _id: new ObjectId(id) });
    }

    // Seters

    // Agregar una pizza
    // Actualizar datos de una pizza
    static async setPizza(id, nombre, categoria, precio, ingredientes){
        const db = await connection();
        const coleccion = db.collection('pizzas');

        await coleccion.updateOne(
        { _id: new ObjectId(id) }, // Buscamos el ingrediente por Id
        {
            $set: {
                nombre: nombre,
                categoria: categoria,
                precio: precio,
                ingredientes: [ingredientes],
            }
        }
    );
    }

    // Eliminar Pizza
    static async deletePizza(id){
        const db = await connection();
        const coleccion = db.collection('pizzas');

        coleccion.deleteOne({_id: new ObjectId(id)});
    }

}

export default Pizza;