function QuienesSomos() {
  return (
    <section className="space-y-4">
      <h2 className="titulo">Quiénes somos</h2>
      <p>
        Somos un supermercado de barrio con más de 15 años de experiencia,
        comprometido con ofrecer productos frescos y de calidad a precios justos.
      </p>

      <div className="tarjeta">
        <h3 className="mb-1 font-bold text-green-800">Misión</h3>
        <p>
          Abastecer a nuestra comunidad de forma cercana y eficiente, manteniendo
          siempre un inventario ordenado y disponible.
        </p>
      </div>

      <div className="tarjeta">
        <h3 className="mb-1 font-bold text-green-800">Visión</h3>
        <p>
          Ser el supermercado preferido de la zona, reconocido por su atención y
          por la buena gestión de sus productos.
        </p>
      </div>

      <div className="tarjeta">
        <h3 className="mb-1 font-bold text-green-800">Nuestros valores</h3>
        <ul className="list-inside list-disc">
          <li>Calidad en cada producto.</li>
          <li>Respeto por nuestros clientes y colaboradores.</li>
          <li>Responsabilidad con el medio ambiente.</li>
        </ul>
      </div>
    </section>
  )
}

export default QuienesSomos
