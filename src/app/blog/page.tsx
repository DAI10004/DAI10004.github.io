import BlogClient from './BlogClient';
import { getAllPosts, getAllTags, getPostsByTag, Post } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const allTagsWithCount = tags.map(tag => ({
    name: tag,
    count: getPostsByTag(tag).length
  }));

  return (
    <BlogClient 
      posts={posts}
      tags={allTagsWithCount}
    />
  );
}
