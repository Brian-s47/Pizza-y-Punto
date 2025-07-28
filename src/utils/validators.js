import chalk from 'chalk';
import _ from 'lodash';

export function validarTextoNoVacioNiSimbolos(input) {
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

export function validarFormatoTelefono(input) {
    const trimmed = input.trim();

    if (_.isEmpty(trimmed)) {
        return chalk.red('❌ Este campo no puede estar vacío.');
    }

    if (!/^\d+$/.test(trimmed)) {
        return chalk.red('❌ El teléfono solo debe contener números.');
    }

    if (trimmed.length !== 10) {
        return chalk.red('❌ El teléfono debe tener exactamente 10 dígitos.');
    }

    return true;
}

export function validarFormatoDireccion(input) {
    const trimmed = input.trim();

    if (_.isEmpty(trimmed)) {
        return chalk.red('❌ La dirección no puede estar vacía.');
    }

    if (trimmed.length < 10) {
        return chalk.red('❌ La dirección es muy corta.');
    }

    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9#\-.,\s]+$/;

    if (!regex.test(trimmed)) {
        return chalk.red('❌ La dirección contiene caracteres no permitidos.');
    }

    return true;
}




