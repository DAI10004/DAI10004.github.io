'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar, 
  Tag, 
  ChevronUp,
  Sun,
  Moon,
  Copy,
  Check
} from 'lucide-react';
import { Post } from '@/lib/posts';

interface PostLayoutProps {
  post: Post;
  children?: React.ReactNode;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function PostLayout({ post, children }: PostLayoutProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // 提取文章中的标题生成目录
  const headings = useMemo(() => {
    const headingElements: Heading[] = [];
    const contentHtml = post.content || '';
    
    // 使用正则表达式提取 h2 和 h3 标签
    const h2Regex = /<h2[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h2>/gi;
    const h3Regex = /<h3[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h3>/gi;
    
    let match;
    while ((match = h2Regex.exec(contentHtml)) !== null) {
      headingElements.push({
        id: match[1],
        text: match[2].replace(/<[^>]+>/g, ''),
        level: 2
      });
    }
    
    while ((match = h3Regex.exec(contentHtml)) !== null) {
      headingElements.push({
        id: match[1],
        text: match[2].replace(/<[^>]+>/g, ''),
        level: 3
      });
    }
    
    return headingElements;
  }, [post.content]);

  // 深色模式切换
  useEffect(() => {
    // 检查系统偏好
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 监听滚动显示返回顶部按钮和高亮目录
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);

      // 找到当前可见的标题
      const headingElements = document.querySelectorAll('h2[id], h3[id]');
      const scrollPosition = window.scrollY + 150;

      let currentHeading = '';
      headingElements.forEach((heading) => {
        const element = heading as HTMLElement;
        if (element.offsetTop <= scrollPosition) {
          currentHeading = element.id;
        }
      });

      setActiveHeading(currentHeading);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 滚动到指定标题
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // 返回顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 复制代码
  const copyCode = async (code: string, blockId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(blockId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  // 处理代码块复制
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
      const pre = block.parentElement as HTMLElement;
      if (pre && !pre.querySelector('.copy-button')) {
        const button = document.createElement('button');
        button.className = 'copy-button absolute top-2 right-2 p-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition-colors opacity-0 group-hover:opacity-100';
        button.innerHTML = copiedCode === pre.id ? 
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' :
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
        
        button.addEventListener('click', () => {
          copyCode(block.textContent || '', pre.id || 'code');
        });

        pre.style.position = 'relative';
        pre.classList.add('group');
        pre.appendChild(button);
      }
    });
  }, [post.content, copiedCode]);

  // 添加行号到代码块
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach((pre) => {
      const code = pre.querySelector('code');
      if (code && !pre.classList.contains('has-line-numbers')) {
        const lines = code.textContent?.split('\n') || [];
        const lineNumbers = lines
          .map((_, index) => `<span class="line-number">${index + 1}</span>`)
          .join('');
        
        const lineNumbersDiv = document.createElement('div');
        lineNumbersDiv.className = 'line-numbers';
        lineNumbersDiv.innerHTML = lineNumbers;
        
        pre.insertBefore(lineNumbersDiv, code);
        pre.classList.add('has-line-numbers');
      }
    });
  }, [post.content]);

  // 格式化标签
  const formatTags = (tags?: string[]) => {
    if (!tags || tags.length === 0) return null;
    return tags.map((tag, index) => (
      <Link
        key={index}
        href={`/blog?tag=${tag}`}
        className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-600 rounded-full text-sm border border-rose-200 hover:border-rose-400 transition-all"
      >
        <Tag className="w-3 h-3" />
        {tag}
      </Link>
    ));
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      
      {/* 深色模式切换按钮 */}
      <motion.button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-24 right-4 z-40 p-3 rounded-full shadow-lg transition-all hover:scale-110 ${
          darkMode 
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
            : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      {/* 返回顶部按钮 */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-4 z-40 p-3 rounded-full shadow-lg transition-all ${
            darkMode ? 'bg-gray-800 text-rose-400 hover:bg-gray-700' : 'bg-white text-rose-500 hover:bg-gray-100'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 左侧：主要内容区 */}
          <div className="flex-1 min-w-0">
            <article className="space-y-8">
              
              {/* 文章头部信息区 */}
              <motion.header
                className={`rounded-2xl p-8 ${darkMode ? 'bg-gray-800/60 backdrop-blur-md border border-gray-600/50' : 'bg-white/30 backdrop-blur-md border border-white/40'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* 返回链接 */}
                <Link
                  href="/blog"
                  className={`inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors ${
                    darkMode ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-500'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  返回文章列表
                </Link>

                {/* 标题 */}
                <h1 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${darkMode ? 'text-white' : 'text-rose-900'}`}>
                  {post.title}
                </h1>

                {/* 元信息 */}
                <div className={`flex flex-wrap gap-4 items-center text-sm ${darkMode ? 'text-gray-400' : 'text-rose-600/70'}`}>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>miaojiang</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                </div>

                {/* 标签 */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formatTags(post.tags)}
                  </div>
                )}
              </motion.header>

              {/* 作者信息栏 */}
              <motion.div
                className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800/60 backdrop-blur-md border border-gray-600/50' : 'bg-white/30 backdrop-blur-md border border-white/40'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-4 flex-shrink-0 overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700/50 border-gray-500/50' : 'bg-white/50 backdrop-blur-sm border-white/60'}`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src="/波奇.png" 
                      alt="波奇头像" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h3 className={`font-bold text-lg drop-shadow-sm ${darkMode ? 'text-white' : 'text-rose-900'}`}>miaojiang</h3>
                    <p className={`text-sm drop-shadow-sm ${darkMode ? 'text-gray-300' : 'text-rose-700'}`}>
                      热爱技术的学生 💫
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 文章正文 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div
                  className={`prose prose-lg max-w-none rounded-2xl p-8 ${darkMode ? 'prose-invert prose-p:text-gray-200 prose-headings:text-white bg-gray-800/60 backdrop-blur-md border border-gray-600/50' : 'prose-p:text-rose-800 prose-headings:text-rose-900 bg-white/30 backdrop-blur-md border border-white/40'} prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-a:text-rose-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-rose-700 prose-code:text-rose-600 prose-pre:bg-rose-50/80 prose-pre:border-rose-200/60 dark:prose-pre:bg-gray-900/80 dark:prose-pre:border-gray-700/60`}
                  dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />
              </motion.div>

            </article>
          </div>

          {/* 右侧：目录导航 */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <motion.div
              className={`lg:sticky lg:top-28 rounded-2xl p-6 ${darkMode ? 'bg-gray-800/60 backdrop-blur-md border border-gray-600/50' : 'bg-white/30 backdrop-blur-md border border-white/40'}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={`font-bold text-lg mb-4 drop-shadow-sm ${darkMode ? 'text-white' : 'text-rose-900'}`}>目录</h3>
              
              {headings.length > 0 ? (
                <nav className="space-y-2">
                  {headings.map((heading) => (
                    <button
                      key={heading.id}
                      onClick={() => scrollToHeading(heading.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                        activeHeading === heading.id
                          ? darkMode
                            ? 'bg-rose-500/20 text-rose-400 font-medium'
                            : 'bg-rose-100 text-rose-600 font-medium'
                          : darkMode
                            ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                            : 'text-rose-700/70 hover:bg-rose-50'
                      } ${heading.level === 3 ? 'ml-4 text-sm' : ''}`}
                    >
                      {heading.text}
                    </button>
                  ))}
                </nav>
              ) : (
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-rose-600/50'}`}>暂无目录</p>
              )}
            </motion.div>
          </aside>

        </div>
      </div>

      {/* 代码块样式 */}
      <style jsx global>{`
        .prose pre {
          position: relative;
          overflow-x: auto;
        }
        
        .line-numbers {
          user-select: none;
          padding-right: 1rem;
          border-right: 1px solid ${darkMode ? '#374151' : '#e5e7eb'};
          margin-right: 1rem;
          text-align: right;
        }
        
        .line-number {
          display: block;
          color: ${darkMode ? '#9ca3af' : '#d1d5db'};
          font-size: 0.875rem;
          line-height: 1.7142857;
        }
        
        .prose pre code {
          display: block;
          padding: 1rem;
          border-radius: 0.5rem;
          background: ${darkMode ? '#1f2937' : '#fef2f2'};
          border: 1px solid ${darkMode ? '#374151' : '#fecaca'};
        }
        
        .copy-button {
          transition: all 0.2s;
        }
        
        .prose h2 {
          scroll-margin-top: 5rem;
        }
        
        .prose h3 {
          scroll-margin-top: 5rem;
        }
      `}</style>
    </div>
  );
}
