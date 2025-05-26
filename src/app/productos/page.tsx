import { productos } from "./productos";
import Image from "next/image";
import Link from "next/link";

function agruparPorMl(productos) {
  const grupos = {
    "200 ml": [],
    "250 ml": [],
    "400 ml": [],
    Otros: [],
  };

  productos.forEach((producto) => {
    if (producto.nombre.includes("200 ml")) {
      grupos["200 ml"].push(producto);
    } else if (producto.nombre.includes("250 ml")) {
      grupos["250 ml"].push(producto);
    } else if (producto.nombre.includes("400 ml")) {
      grupos["400 ml"].push(producto);
    } else {
      grupos["Otros"].push(producto);
    }
  });

  return grupos;
}

export default function ProductosPage() {
  const grupos = agruparPorMl(productos);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {Object.entries(grupos).map(([ml, listaProductos], index) => (
        <section
          key={ml}
          className={`mb-16 ${index === 0 ? "scroll-mt-16 pt-16" : ""}`}
        >
          <h2 className="text-3xl font-bold text-emerald-700 mb-8 border-b-2 border-emerald-300 pb-2">
            Productos {ml}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listaProductos.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100 p-8 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:border-emerald-200 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.7s ease-out forwards",
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Product image */}
                <div className="relative aspect-square mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 to-amber-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={item.imagen}
                    alt={item.nombre}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Badge */}
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
      ))}
    </main>
  );
}
