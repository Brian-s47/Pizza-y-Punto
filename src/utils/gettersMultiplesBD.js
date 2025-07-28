// Zona de importacion de Modulos
import Pizza from '../models/Pizza.js';
import Ingrediente from '../models/Ingrediente.js';
// Funciones Utiles

export async function getPizzasDisponibles() {
  const pizzasActuales = await Pizza.getPizzas();
  const ingredientesActuales = await Ingrediente.getIngredientes();

  const pizzasDisponibles = pizzasActuales.filter(pizza => {
    if (!Array.isArray(pizza.ingredientes) || pizza.ingredientes.length === 0) {
      return false;
    }

    const disponibles = pizza.ingredientes.every(idIng => {
      const id = typeof idIng === 'object' && idIng !== null ? idIng._id : idIng;
      if (!id || !id.toString) return false;

      const ingrediente = ingredientesActuales.find(i => i._id.toString() === id.toString());
      return ingrediente && ingrediente.stock > 0;
    });

    return disponibles;
  });

  return pizzasDisponibles;
}


