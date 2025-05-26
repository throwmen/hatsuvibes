import Link from "next/link";
import { productos } from "../productos/productos";
import { mezclas } from "./mezclas";
import Image from "next/image";

export default function MezclasPorProducto() {
  return (
    <section className="container mx-auto px-4 pt-20 md:px-6">
      {/* Encabezado principal con efecto decorativo */}
      <div className="text-center mb-16 relative">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"></div>
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
          Nuestras Mezclas por Producto
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre combinaciones únicas creadas por nuestros expertos para cada
          uno de nuestros productos
        </p>
      </div>

      {productos.map((producto) => {
        const mezclasDelProducto = mezclas.filter(
          (m) => m.producto_destacado_id === producto.id
        );

        if (mezclasDelProducto.length === 0) return null;

        return (
          <div key={producto.id} className="mb-20 group">
            {/* Encabezado de producto con efecto hover */}
            <Link href={`/productos/${producto.id}`} className="block">
              <div className="flex items-center mb-10 pb-6 border-b border-gray-200 hover:border-emerald-300 transition-colors duration-300">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg group-hover:shadow-emerald-200 transition-shadow duration-300">
                  <Image
                    src={producto.imagen}
                    alt={`Imagen de ${producto.nombre}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10"></div>
                </div>
                <div className="ml-6">
                  <h2 className="text-3xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                    {producto.nombre}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {mezclasDelProducto.length} mezclas disponibles
                  </p>
                </div>
                <svg
                  className="ml-auto w-6 h-6 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            {/* Grid de mezclas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mezclasDelProducto.map((mezcla) => (
                <div
                  key={mezcla.id}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-emerald-100"
                >
                  {/* Imagen con overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`/mezclas/${mezcla.imagen}`}
                      alt={`Imagen de mezcla ${mezcla.nombre}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">
                        {mezcla.nombre}
                      </h3>
                      <p className="text-emerald-200 font-medium">
                        Por {mezcla.autor}
                      </p>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {mezcla.descripcion ||
                        "Descubre esta increíble combinación creada especialmente para este producto."}
                    </p>

                    <Link
                      href={`/mezclas/${mezcla.id}`}
                      className="inline-block"
                    >
                      <button className="cursor-pointer relative overflow-hidden w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-emerald-500/30 group-hover:translate-y-0">
                        <span className="relative z-10">Explorar mezcla</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </button>
                    </Link>
                  </div>

                  {/* Efecto decorativo */}
                  <div className="absolute top-0 -right-16 w-32 h-32 rounded-full bg-emerald-400/10 group-hover:bg-emerald-400/20 transition-all duration-700 group-hover:right-0 group-hover:top-0"></div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Sección decorativa final */}
      <div className="mt-20 text-center">
        <div className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full">
          <p className="text-gray-600 font-medium">
            ¿No encuentras lo que buscas?{" "}
            <Link href="/contacto" className="text-emerald-600 hover:underline">
              Contáctanos
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
