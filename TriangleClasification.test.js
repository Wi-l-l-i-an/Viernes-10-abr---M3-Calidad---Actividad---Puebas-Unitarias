
//Escribir las pruebas unitarias correspondientes utilizando JEST.
//Probar todas las clases de equivalencia (válido e inválido).
//Probar todas las condiciones de borde especificadas.
//Utilizar el principio AAA (Arrange, Act, Assert) en las pruebas unitarias.
//Subir el del programa y las pruebas a un repositorio público en GitHub.
//Asegurarse de que todas las pruebas pasen de entregar la actividad.
//Crear un documento PDF con portada que incluya:
//El enlace al repositorio público de GitHub donde está publicado el proyecto y las pruebas unitarias.
//Evidencia de ejecución de las pruebas (log, captura de pantalla).



// Pruebas unitarias con JEST aplicando el principio AAA
const clasificarTriangulo = require('./TriangleClasiffication');


test('Triángulo equilátero', () => {
  // Arrange
  const a = 3;
  const b = 3;
  const c = 3;
 const expected = 'Equilátero';

  // Act
  const result = clasificarTriangulo(a, b, c);

  // Assert
  expect(result).toBe(expected);
});
