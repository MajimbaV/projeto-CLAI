export function contemApenasNumeros(str) {
  // A expressão regular ^\d+$ verifica se do início (^) ao fim ($) existem apenas dígitos numéricos
  return /^\d+$/.test(str);
}