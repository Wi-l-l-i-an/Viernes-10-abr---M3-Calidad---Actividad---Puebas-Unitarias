//Implementar un programa que clasifica triángulos las longitudes de sus lados.
//El programa debe aceptar tres enteros como entrada, que representan las longitudes de los lados de un triángulo.
//El programa debe clasificar elángulo como equilátero, isósceles o escaleno.

// Ejemplo de implementación en JavaScript

function clasificarTriangulo(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error('Longitudes no válidas');
  }
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new('No es un triángulo');
  }
  if (a === b && b === c) {
    return 'Equilátero';
  }
  if (a === b || b === c || a === c) {
    return 'Isósceles';
  }
  return 'Escaleno';
}

module.exports = clasificarTriangulo;