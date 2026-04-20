// A00840101 | Willian Salomon Lemus Sanchez
// Pruebas Unitarias con JEST

function clasificarTriangulo(a, b, c) {
  // Validaciones
  if (arguments.length !== 3) {
    throw new Error('Número incorrecto de parámetros');
  }

  if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(c)) {
    throw new Error('Los valores deben ser enteros');
  }

  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error('Longitudes no válidas');
  }

  // Regla del triángulo
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('No es un triángulo');
  }

  // Clasificación
  if (a === b && b === c) {
    return 'Equilátero';
  }

  if (a === b || b === c || a === c) {
    return 'Isósceles';
  }

  return 'Escaleno';
}

module.exports = clasificarTriangulo;