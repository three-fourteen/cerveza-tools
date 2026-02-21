import React from 'react'
import { Link } from 'react-router-dom'

const calculators = [
  {
    path: '/hydrometer',
    emoji: '🌡️',
    title: 'Corrección Densímetro',
    description: 'Corrige la lectura del densímetro según la temperatura de medición.',
  },
  {
    path: '/alcohol',
    emoji: '🍺',
    title: 'Alcohol y Atenuación',
    description: 'Calcula el contenido en alcohol (% Vol.) y la atenuación aparente.',
  },
  {
    path: '/mash-temperature',
    emoji: '♨️',
    title: 'Temperatura del Macerado',
    description: 'Calcula la temperatura del agua necesaria para alcanzar la temperatura objetivo.',
  },
  {
    path: '/mash-volume',
    emoji: '🪣',
    title: 'Volumen del Macerado',
    description: 'Estima el volumen que ocupará el macerado en el macerador.',
  },
  {
    path: '/step-mashing',
    emoji: '📈',
    title: 'Temperatura Escalonada',
    description: 'Calcula los litros de agua hirviendo para subir la temperatura del macerado.',
  },
  {
    path: '/evaporation',
    emoji: '💨',
    title: 'Evaporación',
    description: 'Calcula la pérdida por evaporación y el volumen final después del hervido.',
  },
  {
    path: '/initial-density',
    emoji: '📊',
    title: 'Densidad Inicial',
    description: 'Calcula la densidad y el volumen que debes tener antes de hervir.',
  },
  {
    path: '/water-dilution',
    emoji: '💧',
    title: 'Dilución con Agua',
    description: 'Calcula cuánta agua añadir para bajar la densidad al valor objetivo.',
  },
]

export default function Home() {
  return (
    <main className="page">
      <header className="home-header">
        <h1>🍻 Cerveza Tools</h1>
        <p>Calculadoras para cerveceros artesanales</p>
      </header>

      <div className="calculator-grid">
        {calculators.map((calc) => (
          <Link key={calc.path} to={calc.path} className="calculator-card">
            <span className="calculator-card__emoji">{calc.emoji}</span>
            <h2 className="calculator-card__title">{calc.title}</h2>
            <p className="calculator-card__description">{calc.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
