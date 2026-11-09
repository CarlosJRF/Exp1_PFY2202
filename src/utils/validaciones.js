import { TIPOS_PRODUCTO } from '../data/productos.js'

// \p{L} = cualquier letra (incluye tildes y ñ); la bandera "u" activa estas clases Unicode.
// Nombre: 2 a 60 caracteres; letras, números, espacios y . , % - / ( )
export const REGEX_NOMBRE_PRODUCTO = /^[\p{L}\d][\p{L}\d .,%\-/()]{1,59}$/u
// Marca: 1 a 40 caracteres; letras, números, espacios y . & ' -
export const REGEX_MARCA = /^[\p{L}\d][\p{L}\d .&'-]{0,39}$/u
// Nombre de persona: 2 a 60 letras y espacios
export const REGEX_NOMBRE_PERSONA = /^[\p{L}][\p{L} ]{1,59}$/u
export const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const REGEX_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const esEnteroNoNegativo = (valor) => Number.isInteger(valor) && valor >= 0

// Valida lo escrito en el formulario de artículos (todos los valores llegan como texto)
export function validarProducto(datos) {
  const errores = {}
  const nombre = datos.nombre.trim()
  const marca = datos.marca.trim()

  if (!nombre) errores.nombre = 'Ingresa el nombre del artículo.'
  else if (!REGEX_NOMBRE_PRODUCTO.test(nombre)) {
    errores.nombre = 'Usa entre 2 y 60 caracteres: letras, números, espacios y . , % - / ( ).'
  }

  if (!marca) errores.marca = 'Ingresa la marca.'
  else if (!REGEX_MARCA.test(marca)) {
    errores.marca = "Usa hasta 40 caracteres: letras, números, espacios y . & ' -."
  }

  if (!TIPOS_PRODUCTO.includes(datos.tipo)) errores.tipo = 'Selecciona un tipo de producto.'

  if (datos.stock === '') errores.stock = 'Ingresa el stock.'
  else if (!esEnteroNoNegativo(Number(datos.stock))) {
    errores.stock = 'El stock debe ser un número entero mayor o igual a 0.'
  }
  return errores
}

// Comprueba un artículo ya construido (antes de guardarlo o al leerlo de localStorage)
export function esProductoValido(p) {
  return (
    p !== null &&
    typeof p === 'object' &&
    typeof p.id === 'string' &&
    REGEX_UUID.test(p.id) &&
    typeof p.nombre === 'string' &&
    REGEX_NOMBRE_PRODUCTO.test(p.nombre) &&
    typeof p.marca === 'string' &&
    REGEX_MARCA.test(p.marca) &&
    TIPOS_PRODUCTO.includes(p.tipo) &&
    esEnteroNoNegativo(p.stock)
  )
}

export function validarContacto(datos) {
  const errores = {}
  const nombre = datos.nombre.trim()
  if (!nombre) errores.nombre = 'Ingresa tu nombre.'
  else if (!REGEX_NOMBRE_PERSONA.test(nombre)) errores.nombre = 'Usa entre 2 y 60 letras.'

  if (!datos.correo.trim()) errores.correo = 'Ingresa tu correo.'
  else if (!REGEX_CORREO.test(datos.correo.trim())) errores.correo = 'El correo no tiene un formato válido.'

  if (!datos.mensaje.trim()) errores.mensaje = 'Escribe tu mensaje.'
  return errores
}

// Cantidad a llevar al carrito: entero entre 1 y el stock disponible
export function validarCantidad(datos, stockDisponible) {
  const cantidad = Number(datos.cantidad)
  if (datos.cantidad === '') return { cantidad: 'Ingresa una cantidad.' }
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    return { cantidad: 'La cantidad debe ser un número entero mayor que 0.' }
  }
  if (cantidad > stockDisponible) {
    return { cantidad: `Solo hay ${stockDisponible} unidades disponibles.` }
  }
  return {}
}
