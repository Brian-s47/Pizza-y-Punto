// Zona de importacion de librerias
import { v4 as uuidv4 } from 'uuid'; // Para generar ID unico

// Zona de importacion de modulos


// Creacion de Clase
class Ingrediente {
    constructor (id, nombre, tipo, stock){
        // Validador de clase abstracta
        if(this.construcor === Ingrediente){
            throw new Error(`El objeto enviado no es de tipo "Ingrediente"`);
        }
        //Atributos generales
        this.id = uuidv4(); // Le damos un Id unico
        this.nombre = nombre; // Debe ser de tipo string
        this.tipo = tipo; // Debe ser de tipo string
        this.stock = stock; // Debe ser de tipo number
    }
    // Metodos
}

export default Ingrediente;