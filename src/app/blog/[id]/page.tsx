import { notFound } from "next/navigation";
import { posts } from "../posts";

interface PageProps {
  params: { id: string };
}

export default function PostPage({ params }: PageProps) {
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
      {post.instagramUrl && (
        <div className="flex justify-center">
          <iframe
            src={post.instagramUrl}
            allowTransparency={true}
            allowFullScreen={true}
            frameBorder="0"
            height="600"
            className="w-full max-w-md border border-gray-300 rounded-md"
          ></iframe>
        </div>
      )}
    </article>
  );
}

}
