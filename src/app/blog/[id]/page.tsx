import { notFound } from "next/navigation";
import { posts } from "../posts";

interface Params {
  params: { id: string };
}

export default function PostPage({ params }: Params) {
  const post = posts.find((p) => p.id === params.id);

  if (!post) {
    return notFound();
  }

  return (
    <article className="container mx-auto max-w-3xl py-12 px-4 pt-[80px]">
      <h1 className="text-4xl font-bold mb-6">{post.titulo}</h1>
      <p className="text-lg leading-relaxed whitespace-pre-line">
        {post.contenido}
      </p>
    </article>
  );
}
