// Zona de importacion de librerias
import { ObjectId } from 'mongodb'; // Para obtener el id generado por MongoDB

// Zona de importacion de modulos
import connection from '../db/conexion.js' // Modulo de conexion a BD

// Creacion de Clase
class Cliente {
    constructor (nombre, telefono, direccion){
        //Atributos generales
        this.nombre = nombre; // Debe ser de tipo string
        this.telefono = telefono; // Debe ser de tipo numbre
        this.direccion = direccion; // De tipo string completo
        this.pedidos = []; // Array vacio cuando se registra un cliente nuevo sin pedidos
    }
    // Metodos

    // Geters
    // Obtener todos los ingredientes actuales
    static async getClientes(){
        const db = await connection(); // Conectamos con la BD y la traemos
        const coleccion = db.collection("clientes"); // Traemos la coleccion de clientes de la BD
        const clientes = await coleccion.find().toArray(); // traemos todos los clientes y los comvertimos en Array
        return clientes;
    }
    // Obtener un cliente por Id
    static async getClienteId(id){
        const db = await connection();
        const coleccion = db.collection('clientes');
        return await coleccion.findOne({ _id: new ObjectId(id) });
    }

    // Seters

    // Agregar un Clientes
    // Actualizar datos de un cliente
    static async setClientes(id, nombre, telefono, direccion){
        const db = await connection();
        const coleccion = db.collection('clientes');

        await coleccion.updateOne(
        { _id: new ObjectId(id) }, // Buscamos el ingrediente por Id
        {
            $set: {
                nombre: nombre,
                telefono: telefono,
                direccion: direccion    
            }
        });
    }

    // Eliminar Cliente
    static async deleteCliente(id){
        const db = await connection();
        const coleccion = db.collection('clientes');

        coleccion.deleteOne({_id: new ObjectId(id)});
    }

}

export default Cliente;