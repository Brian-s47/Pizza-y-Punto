import chalk from 'chalk';
import _ from 'lodash';

export function validarTextoNoVacio(input) {
    if (_.isEmpty(input.trim())) {
        return chalk.red('❌ Este campo no puede estar vacío. ❌');
    }
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(input) ? true : chalk.red('❌ Solo letras y espacios son permitidos. ❌');
}

export function validarNumeroPositivo(input) {
    if (_.isEmpty(input.trim())) {
        return chalk.red('❌ Este campo no puede estar vacío. ❌');
    }
    const value = parseFloat(input);
    if (isNaN(value)) return chalk.red('❌ Debes ingresar un número válido. ❌');
    if (value < 0) return chalk.red('❌ El número no puede ser negativo. ❌');
    return true;
}

