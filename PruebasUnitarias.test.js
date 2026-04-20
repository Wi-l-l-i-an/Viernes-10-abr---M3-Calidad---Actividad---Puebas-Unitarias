// Pruebas Unitarias para el programa de clasificación de triángulos utilizando JEST
// A00840101 | Willian Salomon Lemus Sanchez

const clasificarTriangulo = require('./PruebasUnitarias');

//Pruebas Unitarias Validos
//Test para triángulo equilátero
test('Triángulo equilátero', () => {
  // Valores de entrada para los triángulos 
  const a = 3, b = 3, c = 3;
  const result = clasificarTriangulo(a, b, c);
  expect(result).toBe('Equilátero');
});

//Test para triángulo isósceles
test('Triángulo isósceles', () => {
  const result = clasificarTriangulo(5, 5, 3);
  expect(result).toBe('Isósceles');
});

//Test para triángulo escaleno
test('Triángulo escaleno', () => {
  const result = clasificarTriangulo(4, 5, 6);
  expect(result).toBe('Escaleno');
});

//Pruebas Unitarias Inválidos
//Triangulo con lados imposibles(no es triángulo), con triangulo invalido, con lados que que vengan asi: a < b + c, b < a + c, c < a + b .
test('no es triángulo', () => {
  expect(() => clasificarTriangulo(1, 2, 3))
    .toThrow('No es un triángulo');
});

//Test con valor de 0 en uno de los lados
test(' lado en cero', () => {
  expect(() => clasificarTriangulo(0, 5, 5))
    .toThrow('Longitudes no válidas');
});

//Test con lado negativo
test('lado negativo', () => {
  expect(() => clasificarTriangulo(-1, 5, 5))
    .toThrow('Longitudes no válidas');
});

//Test con valores no enteros
test('valores no enteros', () => {
  expect(() => clasificarTriangulo(2.5, 3, 4))
    .toThrow('Los valores deben ser enteros');
});

//Test con número de lados incorrecto
test('número incorrecto de parámetros', () => {
  expect(() => clasificarTriangulo(1, 2))
    .toThrow('Número incorrecto de parámetros');
});


// BOUNDARY CONDITIONS Tests

//Triangulos Isosceles que son casi Equilateros.
test('Banana casi equilátero (isósceles)', () => {
  const result = clasificarTriangulo(5, 5, 4);
  expect(result).toBe('Isósceles');
});

//Triangulos scalenps que son casi Isosceles o Equilateros.
test('Banana casi isósceles (escaleno)', () => {
  const result = clasificarTriangulo(5, 4, 3);
  expect(result).toBe('Escaleno');
});

//Triangulos que son muy pequeños.
test('Banana suma apenas válida', () => {
  const result = clasificarTriangulo(2, 3, 4);
  expect(result).toBe('Escaleno');
});

//Triangulos que son muy grandes.
  test('Banana triángulo muy grande', () => {
    const result = clasificarTriangulo(1000000, 1000000, 1000000);
    expect(result).toBe('Equilátero');
});

//Combinaciones de lados muy grandes y muy pequeños.
  test('Banana combinación grande-pequeño válida', () => {
    const result = clasificarTriangulo(1000, 999, 2);
    expect(result).toBe('Escaleno');
});

//Lados que estan fuera de rango.
test('Banana valores extremadamente grandes', () => {
    const result = clasificarTriangulo(999999999, 999999999, 999999999);
    expect(result).toBe('Equilátero');
});

//Triangulo con un lado igual a la suma de los otros dos lados.
//1
test('Banana suma exacta (a + b = c)', () => {
  expect(() => clasificarTriangulo(2, 3, 5)).toThrow();
});
//2
test('Banana suma exacta (a + c = b)', () => {
  expect(() => clasificarTriangulo(2, 5, 3)).toThrow();
});
//3
test('Banana suma exacta (b + c = a)', () => {
  expect(() => clasificarTriangulo(5, 2, 3)).toThrow();
});

//Triangulo que un lado es mas pequeño que la suma de los otros dos lados.
//1
test('Banana apenas válido (a + b > c)', () => {
  const result = clasificarTriangulo(2, 3, 4);
  expect(result).toBe('Escaleno');
});
//2
test('Banana apenas válido (a + c > b)', () => {
  const result = clasificarTriangulo(2, 4, 3);
  expect(result).toBe('Escaleno');
});
//3
test('Banana apenas válido (b + c > a)', () => {
  const result = clasificarTriangulo(4, 2, 3);
  expect(result).toBe('Escaleno');
});

//Triangulo que un lado es mas grande que la suma de los otros dos lados.
//1
test('Banana apenas inválido (a + b < c)', () => {
  expect(() => clasificarTriangulo(2, 3, 6)).toThrow();
});
//2
test('Banana apenas inválido (a + c < b)', () => {
  expect(() => clasificarTriangulo(2, 6, 3)).toThrow();
});
//3
test('Banana apenas inválido (b + c < a)', () => {
  expect(() => clasificarTriangulo(6, 2, 3)).toThrow();
});

