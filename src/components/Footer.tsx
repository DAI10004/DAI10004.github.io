'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import MusicPlayer from './MusicPlayer';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <motion.footer
      className="bg-white/30 backdrop-blur-xl text-rose-900 py-12 border-t border-white/40 mt-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Music Player */}
        <div className="mb-8 max-w-md mx-auto">
          <MusicPlayer />
        </div>
        
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Heart className="w-8 h-8 text-rose-400 mx-auto" fill="currentColor" />
          </motion.div>
          <p className="text-rose-700 font-medium drop-shadow-sm">
            © {currentYear} 我的博客. 保留所有权利.
          </p>
          <motion.p
            className="text-rose-600 text-sm drop-shadow-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            用心记录每一个瞬间 ✨
          </motion.p>
          <div className="flex justify-center gap-6 pt-4">
            <motion.a
              href="https://github.com/DAI10004"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-500 transition-colors drop-shadow-sm"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
            <motion.a
              href="https://blog.csdn.net/2402_86993389?spm=1010.2135.3001.5421"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-500 transition-colors drop-shadow-sm"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              CSDN
            </motion.a>
            <motion.a
              href="https://gitcode.com/2402_86993389"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-500 transition-colors drop-shadow-sm"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              GitCode
            </motion.a>
            <motion.a
              href="mailto:miaojiang@example.com"
              className="text-rose-600 hover:text-rose-500 transition-colors drop-shadow-sm"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Email
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
