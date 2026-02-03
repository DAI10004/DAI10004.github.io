import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import type { Metadata } from 'next';

// 生成所有可能的静态路径
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// 生成每篇文章的 metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: '文章不存在',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-24 px-4">
      <article className="container mx-auto max-w-4xl">
        {/* 返回链接 */}
        <Link
          href="/blog"
          className="inline-block mb-8 text-blue-400 hover:text-blue-300"
        >
          ← 返回文章列表
        </Link>

        {/* 文章头部 */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-500">
            <time dateTime={post.date}>{post.date}</time>
          </div>
        </header>

        {/* 文章内容 */}
        <div
          className="prose prose-invert prose-lg max-w-none bg-gray-900 border border-gray-800 rounded-lg p-8"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </article>
    </div>
  );
}
