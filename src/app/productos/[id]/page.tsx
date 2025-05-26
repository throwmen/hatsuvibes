// app/productos/[id]/page.tsx
import { productos } from "../productos";
import { notFound } from "next/navigation";

export default function ProductoPage({ params }: { params: { id: string } }) {
  const producto = productos.find((p) => p.id === params.id);

  if (!producto) return notFound();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{producto.nombre}</h1>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-auto mb-4 rounded-xl shadow-md"
      />
      <p className="text-gray-700 mb-2">{producto.descripcion}</p>
      <p className="text-lg font-semibold text-green-700">{producto.precio}</p>
    </div>
  );
}
