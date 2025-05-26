"use client";

import Image from "next/image";
import { productos } from "./productos/productos";
import { posts } from "./blog/posts";
import { mezclas } from "./mezclas/mezclas";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50/30 text-slate-800 font-inter">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_rgb(16_185_129)_1px,_transparent_0)] bg-[length:24px_24px] pointer-events-none"></div>

      <div className="relative z-10 px-8 py-20 space-y-32">
        {/* Sección: Descubre nuestros productos */}
        <section id="productos" className="container mx-auto">
          {/* Header with animated gradient */}
          <div className="max-w-4xl mx-auto text-center mb-16 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 rounded-full"></div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent mb-8 tracking-tight leading-tight">
              Descubre nuestros productos
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Explora la línea exclusiva de Hatsu diseñada para darte bienestar
              y calidad premium en cada sorbo
            </p>
          </div>

          {/* Products Grid with enhanced cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {productos.slice(0, 3).map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100 p-8 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:border-emerald-200 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Product image with enhanced styling */}
                <div className="relative aspect-square mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 to-amber-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={item.imagen}
                    alt={item.nombre}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Premium
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="font-bold text-2xl text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                    {item.nombre}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-4">
                    {item.descripcion}
                  </p>

                  {/* CTA button con enlace dinámico */}
                  <Link href={`/productos/${item.id}`}>
                    <button className="cursor-pointer w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
                      Explorar producto
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección: Mira nuestros posts */}
        <section id="posts" className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-600 rounded-full"></div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-800 bg-clip-text text-transparent mb-8 tracking-tight">
              Mira nuestros posts
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Artículos sobre bienestar, comunidad y la vibra única de Hatsu
              Vibes
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {posts.slice(1, 4).map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="block group"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInLeft 0.8s ease-out forwards",
                }}
              >
                <div
                  className={`relative p-8 bg-gradient-to-r ${
                    index === 0
                      ? "from-teal-50 to-emerald-50"
                      : index === 1
                      ? "from-emerald-50 to-teal-50"
                      : "from-cyan-50 to-teal-50"
                  } rounded-2xl border border-white/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_2px_2px,_currentColor_1px,_transparent_0)] bg-[length:32px_32px] text-emerald-600 group-hover:animate-pulse"></div>

                  <div className="relative flex items-start space-x-8">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${
                          index === 0
                            ? "from-teal-500 to-emerald-600"
                            : index === 1
                            ? "from-emerald-500 to-teal-600"
                            : "from-cyan-500 to-teal-600"
                        } rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-white font-bold text-2xl">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-3xl font-bold mb-4 text-slate-800 group-hover:text-emerald-700 transition-colors duration-300">
                        {post.titulo}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg mb-4">
                        {post.contenido.split("\n")[0]}
                      </p>
                      <div className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors">
                        <span>Leer artículo completo</span>
                        <svg
                          className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Sección: Mira estas mezclas */}
        <section id="mezclas" className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-600 rounded-full"></div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-800 bg-clip-text text-transparent mb-8 tracking-tight">
              Mira estas mezclas
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Combinaciones especiales de nuestros tés para diferentes momentos
              del día y necesidades de bienestar
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {mezclas.map((mezcla, index) => (
              <Link
                key={mezcla.id}
                href={`/mezclas/${mezcla.id}`}
                className="group relative"
                style={{
                  animationDelay: `${index * 300}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                <div
                  className={`relative bg-gradient-to-br from-amber-50 via-emerald-50 to-amber-100 rounded-3xl border border-white/50 p-10 hover:shadow-2xl transition-all duration-700 overflow-hidden hover:-translate-y-3`}
                >
                  {/* Floating orbs */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000"></div>

                  {/* Image container */}
                  <div className="relative aspect-video mb-8 overflow-hidden rounded-2xl shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-emerald-400 to-amber-600 opacity-20"></div>
                    <Image
                      src={`/mezclas/${mezcla.imagen}`}
                      alt={mezcla.nombre}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {mezcla.producto_destacado_id}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-bold text-3xl text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                      {mezcla.nombre}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Por: {mezcla.autor} – {mezcla.fecha}
                    </p>
                    <ul className="text-slate-600 leading-relaxed text-base mb-6 list-disc list-inside">
                      {mezcla.ingredientes.map((ing, i) => (
                        <li key={i}>
                          {ing.nombre} – {ing.cantidad}
                        </li>
                      ))}
                    </ul>

                    {/* Botón CTA */}
                    <div className="flex items-center justify-between">
                      <button className="cursor-pointer bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        Ver preparación
                      </button>
                      <div className="flex items-center text-slate-500 group-hover:text-emerald-600 transition-colors">
                        <svg
                          className="w-6 h-6 group-hover:animate-bounce"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Sección: Experiencias Hatsu */}
        <section id="experiencias" className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-fuchsia-400 via-pink-500 to-rose-500 rounded-full"></div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-800 bg-clip-text text-transparent mb-8 tracking-tight leading-tight">
              Experiencias Hatsu: Más Allá de la Botella
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Sumérgete en el universo Hatsu de una forma innovadora. Escanea,
              interactúa y descubre contenido exclusivo que da vida a nuestras
              vibras.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <Link href="/ar">
              <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-100 hover:shadow-2xl hover:shadow-rose-400/20 transition-all duration-500 hover:border-pink-200">
                <h3 className="text-3xl font-bold text-rose-700 mb-4">
                  Realidad Aumentada Hatsu
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  Escanea el empaque y observa cómo los ingredientes cobran
                  vida, o participa en mini-juegos interactivos.
                </p>
                <p className="text-slate-600 text-lg">
                  La Realidad Aumentada (AR) con 8th Wall y otras tecnologías
                  inmersivas son parte de nuestra visión para el futuro. Estamos
                  trabajando para traer estas experiencias a la vida.
                </p>
              </div>
            </Link>
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-100 hover:shadow-2xl hover:shadow-fuchsia-400/20 transition-all duration-500 hover:border-pink-200">
              <h3 className="text-3xl font-bold text-rose-700 mb-4">
                Escanea y Descubre
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Busca los códigos QR en nuestros empaques Hatsu. Cada uno es una
                puerta a una nueva experiencia digital.
              </p>
              <p className="text-slate-600 text-lg">
                Sin necesidad de apps. Accede a animaciones 3D, filtros
                exclusivos y juegos directamente desde tu navegador móvil.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-slate-600">Conoce Más Próximamente</p>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
