'use client'

import { useState } from 'react'

export default function LineasSection() {
  const [selectedLine, setSelectedLine] = useState<any>(null)

  const lineas = [
    {
      id: 'A',
      nombre: 'Línea A',
      tipo: 'Troncal Interhospitalario',
      recorrido: 'Hospital Marcial Quiroga ↔ Hospital Guillermo Rawson',
      descripcion: 'Conecta los dos principales centros de salud de la provincia de manera rápida y directa.',
      frecuencia: 'Alta frecuencia (aprox. 10-15 min)',
      color: 'bg-libertador-blue',
      textColor: 'text-white',
      badge: 'Insignia',
      detalle: [
        'Hospital Marcial Quiroga',
        'Av. Libertador Gral. San Martín',
        'Hospital Guillermo Rawson',
        'Terminal de Ómnibus',
        'Centro Cívico'
      ]
    },
    {
      id: '140',
      nombre: 'Línea 140',
      tipo: 'Interurbana',
      recorrido: 'Cementerio de Zonda ↔ Hospital Rawson',
      descripcion: 'Servicio esencial que une el departamento de Zonda con la Capital.',
      frecuencia: 'Frecuencia regular',
      color: 'bg-white',
      textColor: 'text-libertador-blue',
      detalle: [
        'Cementerio de Zonda',
        'Ruta Provincial 12',
        'Av. Libertador',
        'Hospital Rawson'
      ]
    },
    {
      id: '141',
      nombre: 'Línea 141',
      tipo: 'Interurbana',
      recorrido: 'Villa Tacú (Zonda) ↔ Hospital Rawson',
      descripcion: 'Conexión directa desde la zona turística de Villa Tacú hacia el centro.',
      frecuencia: 'Frecuencia regular',
      color: 'bg-white',
      textColor: 'text-libertador-blue',
      detalle: [
        'Villa Tacú',
        'Zonda Centro',
        'Ruta 12',
        'Capital'
      ]
    },
    {
      id: '142',
      nombre: 'Línea 142',
      tipo: 'Interurbana',
      recorrido: 'Museo Manzini (Zonda) ↔ Hospital Rawson',
      descripcion: 'Recorrido histórico y turístico que conecta puntos culturales de Zonda.',
      frecuencia: 'Frecuencia regular',
      color: 'bg-white',
      textColor: 'text-libertador-blue',
      detalle: [
        'Museo Manzini',
        'Zonda',
        'Rivadavia',
        'Capital'
      ]
    },
    {
      id: '160',
      nombre: 'Línea 160',
      tipo: 'Urbana',
      recorrido: 'Barrio Agapito Gil ↔ Hospital Rawson',
      descripcion: 'Servicio urbano clave para la zona oeste del Gran San Juan.',
      frecuencia: 'Frecuencia regular',
      color: 'bg-white',
      textColor: 'text-libertador-blue',
      detalle: [
        'Barrio Agapito Gil',
        'La Bebida',
        'Ignacio de la Roza',
        'Hospital Rawson'
      ]
    },
    {
      id: '161',
      nombre: 'Línea 161',
      tipo: 'Interurbana',
      recorrido: 'Diferimientos / V. Basilio Nievas ↔ Hospital Rawson',
      descripcion: 'Cobertura amplia conectando zonas productivas y residenciales.',
      frecuencia: 'Frecuencia regular',
      color: 'bg-white',
      textColor: 'text-libertador-blue',
      detalle: [
        'Villa Basilio Nievas',
        'Hospital Marcial Quiroga',
        'Av. Libertador',
        'Hospital Rawson'
      ]
    },
    {
      id: '162',
      nombre: 'Línea 162',
      tipo: 'Turística / Interurbana',
      recorrido: 'Dique Punta Negra ↔ Hospital Rawson',
      descripcion: 'Conecta el Dique Punta Negra y zonas turísticas con el centro administrativo.',
      frecuencia: 'Frecuencia especial fines de semana',
      color: 'bg-white',
      textColor: 'text-libertador-blue',
      detalle: [
        'Dique Punta Negra',
        'Parque Faunístico',
        'Centro Cívico',
        'Hospital Rawson'
      ]
    }
  ]

  return (
    <section id="recorridos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestras Líneas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conectamos San Juan con una red eficiente y moderna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Línea A - Destacada */}
          <div 
            className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-libertador-blue to-blue-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-all duration-300"
            onClick={() => setSelectedLine(lineas[0])}
            data-aos="fade-up"
          >
            <div className="p-8 md:p-10 text-white relative">
              <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Insignia
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-4xl md:text-5xl font-extrabold mb-2">Línea A</h3>
                  <p className="text-xl md:text-2xl text-blue-100 font-medium">Corredor Interhospitalario</p>
                  <p className="mt-4 text-blue-50 max-w-2xl text-lg">
                    {lineas[0].recorrido}
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">Alta Frecuencia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="font-semibold">Troncal Principal</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center text-sm font-medium text-blue-200 group">
                Ver detalle del recorrido 
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Resto de las líneas */}
          {lineas.slice(1).map((linea, index) => (
            <div
              key={linea.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedLine(linea)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-libertador-blue transition-colors duration-300">
                    <span className="text-2xl font-bold text-libertador-blue group-hover:text-white transition-colors duration-300">
                      {linea.id}
                    </span>
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">
                    {linea.tipo}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{linea.nombre}</h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{linea.recorrido}</p>
                <div className="flex items-center text-libertador-blue text-sm font-medium">
                  Ver recorrido
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalle */}
      {selectedLine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedLine(null)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className={`p-6 ${selectedLine.id === 'A' ? 'bg-libertador-blue text-white' : 'bg-gray-50 border-b border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-2xl font-bold ${selectedLine.id === 'A' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedLine.nombre}
                  </h3>
                  <p className={`text-sm mt-1 ${selectedLine.id === 'A' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {selectedLine.tipo}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedLine(null)}
                  className={`p-2 rounded-full hover:bg-black/10 transition-colors ${selectedLine.id === 'A' ? 'text-white' : 'text-gray-500'}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-libertador-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Recorrido Principal
                </h4>
                <p className="text-gray-700 text-lg leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-100">
                  {selectedLine.recorrido}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Puntos Clave</h4>
                  <ul className="space-y-2">
                    {selectedLine.detalle.map((punto: string, idx: number) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <span className="w-2 h-2 mt-2 mr-2 bg-libertador-blue rounded-full flex-shrink-0"></span>
                        {punto}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Frecuencia y Horarios</h4>
                  <p className="text-gray-600 mb-4">{selectedLine.frecuencia}</p>
                  <a 
                    href="https://www.redtulum.gob.ar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-libertador-blue hover:text-blue-800 font-medium transition-colors"
                  >
                    Ver horarios en tiempo real
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500 flex items-start">
                <svg className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>
                  Los recorridos pueden sufrir modificaciones por cortes de calle o eventos especiales. 
                  Te recomendamos consultar la app oficial de RedTulum para información en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
