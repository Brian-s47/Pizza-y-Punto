// Zona de importacion de librerias
import { ObjectId } from 'mongodb'; // Para obtener el id generado por MongoDB

// Zona de importacion de modulos
import connection from '../db/conexion.js' // Modulo de conexion a BD

// Creacion de Clase
class Repartidor {
    constructor (nombre, zona){
        //Atributos generales
        this.nombre = nombre; // Debe ser de tipo string
        this.zona = zona; // De tipo string completo
        this.estado = true; // estado por defecto disponible=true al crearlo
    }
    // Metodos

    // Geters
    // Obtener todos los repartidores actuales
    static async getRepartidores(){
        const db = await connection(); // Conectamos con la BD y la traemos
        const coleccion = db.collection("repartidores"); // Traemos la coleccion de repartidores de la BD
        const repartidores = await coleccion.find().toArray(); // traemos todos los repartidores y los comvertimos en Array
        return repartidores;
    }
    // Obtener un repartidor por Id
    static async getRepartidoreId(id){
        const db = await connection();
        const coleccion = db.collection('repartidores');
        return await coleccion.findOne({ _id: new ObjectId(id) });
    }
    // Obtener Repartidores Disponibles
    static async getRepartidoresDisponibles(){
        const repartidoresActuales = await getRepartidores();
        const repartidoresDisponibles = repartidoresActuales
            .filter(rep => rep.estado === true)
            .map(rep => ({
            name: `${rep.nombre} - Zona: (${rep.zona}) `,
            value: rep.nombre
        }));
        return repartidoresDisponibles
    }

    // Seters

    // Agregar un Repartidor
    // Actualizar datos de un repartidor
    static async setRepartidores(nombre, telefono, direccion){
        const db = await connection();
        const coleccion = db.collection('clientes');

        await coleccion.updateOne(
        { _id: new ObjectId(id) }, // Buscamos el ingrediente por Id
        {
            $set: {
                nombre: nombre,
                zona: zona,
                estado: estado    
            }
        });
    }

    // Eliminar Repartidor
    static async deleteRepartidor(id){
        const db = await connection();
        const coleccion = db.collection('repartidores');

        coleccion.deleteOne({_id: new ObjectId(id)});
    }

}

export default Repartidor;