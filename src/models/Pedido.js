// Zona de importacion de librerias
import { ObjectId } from 'mongodb'; // Para obtener el id generado por MongoDB

// Zona de importacion de modulos
import connection from '../db/conexion.js' // Modulo de conexion a BD
import { times } from 'lodash';

// Creacion de Clase
class Pedido {
    constructor (clienteId, pizzas, total, repartidorId){
        //Atributos generales
        this.clienteId = clienteId; // Debe ser de tipo string
        this.pizzas = [pizzas]; // Array vacio para asignar las pizzas seleccionadas
        this.total = total; // Debe ser de tipo number
        this.fecha = Date(times); // Debe ser de tipo number
        this.repartidorAsignado = repartidorId; // repartidor asignado
        this.estado = false; // Estado del pedido por defecto pendiente Entrega = False
    }
    // Metodos

    // Geters
    // Obtener todos los Pedidos actuales
    static async getPedidos(){
        const db = await connection(); // Conectamos con la BD y la traemos
        const coleccion = db.collection("pedidos"); // Traemos la coleccion de pedidos de la BD
        const pedidos = await coleccion.find().toArray(); // traemos todas las pedidos y los comvertimos en Array
        return pedidos; // Devolvemos el array de pedidos obtenido
    }
    // Obtener una pedido por Id
    static async getPedidoId(id){
        const db = await connection();
        const coleccion = db.collection('pedidos');
        return await coleccion.findOne({ _id: new ObjectId(id) });
    }

    // Seters

    // Agregar una pizza
    // Actualizar datos de un pedido
    static async setPedido(clienteId, total, pizzas, repartidorId){
        const db = await connection();
        const coleccion = db.collection('pedidos');

        await coleccion.updateOne(
        { _id: new ObjectId(id) }, // Buscamos el pedido por Id
        {
            $set: {
                clienteId: clienteId,
                total: total,
                pizzas: [pizzas],
                repartidorId: [repartidorId],
            }
        }
    );
    }

    // Eliminar Pedido
    static async deletePedido(id){
        const db = await connection();
        const coleccion = db.collection('pedidos');

        coleccion.deleteOne({_id: new ObjectId(id)});
    }

    // Marcar como completada
    static async completarPedido(id) {
        const db = obtenerDB();
        await db.collection('pedidos').updateOne(
            { _id: new ObjectId(id) },
            { $set: { completada: true } }
        );
    }

}

export default Pedido;