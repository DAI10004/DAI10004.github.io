import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content?: string;
}

// 获取所有文章的元数据
export function getAllPosts(): Post[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // 移除 ".md" 扩展名以获取 slug
      const slug = fileName.replace(/\.md$/, '');

      // 读取文件内容
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // 使用 gray-matter 解析 frontmatter
      const matterResult = matter(fileContents);

      // 合并数据
      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        description: matterResult.data.description,
      };
    });

  // 按日期排序文章（最新的在前）
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 获取单篇文章的完整内容
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // 使用 remark 将 Markdown 转换为 HTML
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
    content: contentHtml,
  };
}

// 获取所有文章的 slug（用于 generateStaticParams）
export function getAllPostSlugs(): string[] {
  const allPosts = getAllPosts();
  return allPosts.map((post) => post.slug);
}
