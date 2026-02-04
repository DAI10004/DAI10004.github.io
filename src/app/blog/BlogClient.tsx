'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Tag, ArrowRight, BookOpen, Filter } from 'lucide-react';
import { Post } from '@/lib/posts';
import { SidebarLayout } from '@/components/PageLayout';
import Sidebar from '@/components/Sidebar';

interface TagWithCount {
  name: string;
  count: number;
}

interface BlogClientProps {
  posts: Post[];
  tags: TagWithCount[];
}

export default function BlogClient({ posts, tags }: BlogClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  
  // 根据选中的标签筛选文章
  const filteredPosts = useMemo(() => {
    if (selectedTag === 'all') {
      return posts;
    }
    return posts.filter(post => post.tags && post.tags.includes(selectedTag));
  }, [selectedTag, posts]);

  // 标签按钮颜色映射
  const getTagColor = (tag: string, isSelected: boolean) => {
    const colors = [
      'from-rose-100 to-pink-100 text-rose-600 border-rose-200',
      'from-purple-100 to-pink-100 text-purple-600 border-purple-200',
      'from-pink-100 to-purple-100 text-pink-600 border-pink-200',
      'from-rose-100 to-purple-100 text-rose-600 border-rose-200'
    ];
    const index = tags.findIndex(t => t.name === tag) % colors.length;
    const colorClass = colors[index];
    
    return isSelected
      ? `bg-gradient-to-r ${colorClass} shadow-md`
      : `bg-white/80 text-rose-600 border-sakura-100 hover:border-rose-300`;
  };

  return (
    <SidebarLayout
      sidebar={<Sidebar />}
    >
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="bg-white/50 backdrop-blur-sm text-rose-600 px-4 py-2 rounded-full text-sm font-medium border border-white/60 shadow-sm">
              ✨ 文章列表
            </span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              所有文章
            </span>
          </motion.h1>
          
          <motion.p
            className="text-lg text-rose-700 drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            共 {posts.length} 篇文章 · {tags.length} 个标签
          </motion.p>
        </motion.div>

        {/* Tags Filter */}
        {tags.length > 0 && (
          <motion.div
            className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-white/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              className="flex items-center gap-2 mb-4"
              whileHover={{ x: 5 }}
            >
              <Filter className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg font-semibold text-rose-900 drop-shadow-sm">标签筛选</h2>
            </motion.div>
            
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => setSelectedTag('all')}
                className={`px-4 py-2 rounded-full border font-medium transition-all ${
                  selectedTag === 'all'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-500 shadow-md'
                    : 'bg-white/50 backdrop-blur-sm text-rose-600 border-white/60 hover:bg-white/70'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                全部 ({posts.length})
              </motion.button>
              
              {tags.map((tag) => (
                <motion.button
                  key={tag.name}
                  onClick={() => setSelectedTag(tag.name)}
                  className={`px-4 py-2 rounded-full border font-medium transition-all ${getTagColor(tag.name, selectedTag === tag.name)}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Tag className="w-3 h-3 inline mr-1" />
                  {tag.name}
                  <span className="ml-1 opacity-70">
                    ({tag.count})
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-4"
            >
              <BookOpen className="w-16 h-16 text-rose-300 mx-auto" />
            </motion.div>
            <p className="text-rose-600/70 text-xl mb-2">暂无文章</p>
            <p className="text-rose-600/50">该标签下还没有文章</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.div
                  className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-white/40 hover:border-white/60 transition-all hover:shadow-xl hover:shadow-rose-100/20"
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <motion.h2
                      className="text-xl md:text-2xl font-semibold text-rose-900 mb-3 hover:text-rose-600 transition-colors drop-shadow-sm"
                      whileHover={{ x: 5 }}
                    >
                      {post.title}
                    </motion.h2>
                  </Link>
                  
                  <p className="text-rose-700 mb-4 leading-relaxed drop-shadow-sm">
                    {post.description}
                  </p>
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer transition-all backdrop-blur-sm ${
                            selectedTag === tag
                              ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-600 border-rose-200'
                              : 'bg-white/50 text-rose-600 border-white/60 hover:bg-white/70'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Tag className="w-3 h-3 inline mr-1" />
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-rose-600 drop-shadow-sm">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-rose-500 hover:text-rose-600 transition-colors font-medium inline-flex items-center gap-1 group"
                    >
                      阅读更多
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {filteredPosts.length > 0 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-rose-600 flex items-center justify-center gap-2 drop-shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              显示 {filteredPosts.length} 篇文章
              {selectedTag !== 'all' && ` · 标签: ${selectedTag}`}
            </motion.div>
          </motion.div>
        )}
      </div>
    </SidebarLayout>
  );
}
