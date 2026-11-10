// "1 unidad", "3 unidades"
export function contar(cantidad, singular, plural) {
  return `${cantidad} ${cantidad === 1 ? singular : plural}`
}
