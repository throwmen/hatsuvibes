import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { mezclas } from "../mezclas";

interface Params {
  params: { id: string };
}

export default function MezclaDetallePage({ params }: Params) {
  const mezcla = mezclas.find((m) => m.id === params.id);

  if (!mezcla) {
    return notFound();
  }

  return (
    <section className="max-w-3xl mx-auto py-12 pt-[80px] px-4 text-center">
      <Link
        href="/#mezclas"
        className="
            inline-flex items-center
            text-emerald-600 
            hover:text-emerald-800 
            font-semibold 
            mb-8 
            transition-colors 
            duration-300
            group
        "
      >
        <svg
          className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Volver a las mezclas
      </Link>

      <h1 className="text-4xl font-bold mb-4">{mezcla.nombre}</h1>
      <p className="text-gray-600 mb-2">Autor: {mezcla.autor}</p>
      <p className="text-gray-600 mb-8">Fecha: {mezcla.fecha}</p>

      <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden">
        <Image
          src={`/mezclas/${mezcla.imagen}`}
          alt={mezcla.nombre}
          fill
          className="object-cover"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-2">Ingredientes</h2>
      <ul className="list-disc list-inside mb-6 text-left inline-block">
        {mezcla.ingredientes.map((ing, i) => (
          <li key={i}>
            {ing.nombre} – {ing.cantidad}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Preparación</h2>
      <ol className="list-decimal list-inside mb-6 text-left inline-block">
        {mezcla.preparacion.map((paso, i) => (
          <li key={i}>{paso}</li>
        ))}
      </ol>

      <h2 className="text-2xl font-semibold mb-2 text-red-600">Advertencias</h2>
      <ul className="list-disc list-inside text-red-600 text-left inline-block">
        {mezcla.advertencias.map((adv, i) => (
          <li key={i}>{adv}</li>
        ))}
      </ul>
    </section>
  );
}
