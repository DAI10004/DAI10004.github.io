import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts().slice(0, 3); // 显示最新 3 篇文章

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              欢迎来到我的博客
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              分享编程经验、技术思考与个人成长
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/blog"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                浏览文章
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                关于我
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            最新文章
          </h2>
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-2xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-400 mb-4">{post.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{post.date}</span>
                </div>
              </article>
            ))}
          </div>
          {posts.length > 0 && (
            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                查看全部文章 →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
