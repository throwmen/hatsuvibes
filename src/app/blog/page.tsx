import Link from "next/link";
import { posts } from "./posts";

export default function BlogPage() {
  return (
    <section className="container mx-auto py-12 pt-[80px]">
      <h1 className="text-4xl font-bold mb-8 text-center">Todos los Posts</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block p-6 bg-slate-100 rounded-lg shadow hover:bg-slate-200 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{post.titulo}</h2>
            <p className="text-gray-700">{post.contenido.slice(0, 150)}...</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
