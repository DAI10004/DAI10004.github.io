import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import type { Metadata } from 'next';
import PostLayout from '@/components/PostLayout';

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
    <PostLayout post={post}>
      {/* 文章内容已经在PostLayout中渲染 */}
    </PostLayout>
  );
}
