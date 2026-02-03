import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-10">
          所有文章
        </h1>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">暂无文章</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-colors"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-3xl font-semibold text-white mb-4 hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-400 text-lg mb-4 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <time dateTime={post.date}>{post.date}</time>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
