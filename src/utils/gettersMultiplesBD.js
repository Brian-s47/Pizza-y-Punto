// Zona de importacion de Modulos
import Pizza from '../models/Pizza.js';
import Ingrediente from '../models/Ingrediente.js';
// Funciones Utiles

export async function getPizzasDisponibles() {
  const pizzasActuales = await Pizza.getPizzas();
  const ingredientesActuales = await Ingrediente.getIngredientes();

  const pizzasDisponibles = pizzasActuales.filter(pizza => {
    const ingredientesPizza = pizza.ingredientes;
    const disponibles = ingredientesPizza.every(idIng => {
      const ingrediente = ingredientesActuales.find(i => i._id.toString() === idIng.toString());
      return ingrediente && ingrediente.stock > 0;
    });
    return disponibles;
  });

  return pizzasDisponibles;
}
