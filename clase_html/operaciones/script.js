// script.js

// Paso 1: Pedir los números al usuario
let input1 = prompt("Ingresá el primer número:");
let input2 = prompt("Ingresá el segundo número:");

// Paso 2: Validar que sean números
if (isNaN(input1) || isNaN(input2)) {
  console.log("⚠️ Por favor, ingresá valores numéricos válidos.");
} else {
  // Paso 3: Convertir a números decimales
  let num1 = parseFloat(input1);
  let num2 = parseFloat(input2);

  // Paso 4: Realizar operaciones
  let suma = num1 + num2;
  let resta = num1 - num2;
  let multiplicacion = num1 * num2;
  let division = num2 !== 0 ? num1 / num2 : "No se puede dividir por 0";

  // Paso 5: Mostrar los resultados
  console.log("🔢 Resultados de las operaciones:");
  console.log(`Suma: ${suma}`);
  console.log(`Resta: ${resta}`);
  console.log(`Multiplicación: ${multiplicacion}`);
  console.log(`División: ${division}`);

  // Paso 6: Verificar si la suma es mayor o menor que 100
  const valorComparacion = 100;
  if (suma > valorComparacion) {
    console.log(`✅ La suma (${suma}) es MAYOR que ${valorComparacion}`);
  } else if (suma < valorComparacion) {
    console.log(`⚠️ La suma (${suma}) es MENOR que ${valorComparacion}`);
  } else {
    console.log(`📍 La suma es exactamente ${valorComparacion}`);
  }
}
