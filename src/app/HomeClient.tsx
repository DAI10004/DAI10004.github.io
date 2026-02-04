'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, Heart } from 'lucide-react';
import { Post } from '@/lib/posts';
import { SidebarLayout } from '@/components/PageLayout';
import Sidebar from '@/components/Sidebar';

interface HomeClientProps {
  posts: Post[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  return (
    <SidebarLayout
      sidebar={<Sidebar />}
    >
      <div className="space-y-8">
        {/* Welcome Banner */}
        <motion.div
          className="bg-transparent rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="bg-transparent text-rose-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              ✨ Hi, I'm miaojiang
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-3xl font-bold mb-4 drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-rose-600">
              欢迎来到 我的博客
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-rose-600 mb-6 max-w-2xl leading-relaxed drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            分享编程经验、技术思考与个人成长
            <br />
            记录每一个精彩的瞬间 💫
          </motion.p>

          <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-rose-600 rounded-full border-2 border-rose-300/30 hover:border-rose-400/50 transition-all font-medium shadow-sm"
              >
                <BookOpen className="w-5 h-5" />
                浏览文章
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-rose-600 rounded-full border-2 border-rose-300/30 hover:border-rose-400/50 transition-all font-medium shadow-sm"
                >
                  <Heart className="w-5 h-5" />
                  关于我
                </Link>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="mt-8 flex gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {
              [
                { icon: Sparkles, label: '用心创作' },
                { icon: BookOpen, label: '持续分享' },
                { icon: Heart, label: '热爱生活' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center shadow-sm">
                    <item.icon className="w-5 h-5 text-rose-500" />
                  </div>
                  <span className="text-sm text-rose-600 font-medium drop-shadow-sm">{item.label}</span>
                </motion.div>
              ))
            }
          </motion.div>
        </motion.div>

        {/* Latest Posts */}
        <section>
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-rose-600">
              最新文章
            </span>
          </motion.h2>

          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <motion.div
                  className="bg-transparent rounded-xl p-6 hover:shadow-xl transition-all"
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl md:text-2xl font-semibold text-rose-900 mb-2 hover:text-rose-600 transition-colors drop-shadow-sm">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-rose-700 mb-3 leading-relaxed drop-shadow-sm">{post.description}</p>
                  <div className="flex items-center justify-between text-sm text-rose-600 drop-shadow-sm">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-500" />
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

          {posts.length > 0 && (
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-rose-600 rounded-full border border-rose-300/30 hover:border-rose-400/50 transition-all font-medium shadow-sm"
                >
                  查看全部文章
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </section>
      </div>
    </SidebarLayout>
  );
}
