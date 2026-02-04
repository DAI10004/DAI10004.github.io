'use client';

import { motion } from 'framer-motion';
import { Sparkles, Github, MessageSquare } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
      {/* Personal Info Card */}
      <motion.div
        className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:border-white/60 transition-all hover:shadow-xl hover:shadow-rose-100/20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -2 }}
      >
        <div className="text-center">
          <motion.div
            className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center border-4 border-white/60 overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src="/波奇.png" 
              alt="波奇头像" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <h3 className="text-xl font-bold text-rose-900 mb-2 drop-shadow-sm">miaojiang</h3>
          <p className="text-rose-700 text-sm mb-4 drop-shadow-sm">
            热爱技术的学生 💫
          </p>
          <div className="flex justify-center gap-3">
            <motion.a
              href="https://github.com/DAI10004"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center text-rose-500 hover:bg-white/70 transition-colors border border-white/60"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://blog.csdn.net/2402_86993389?spm=1010.2135.3001.5421"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/70 transition-colors overflow-hidden border border-white/60"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="CSDN"
            >
              <img 
                src="/CSDN-favicon.ico" 
                alt="CSDN" 
                className="w-5 h-5 object-contain"
              />
            </motion.a>
            <motion.a
              href="https://gitcode.com/2402_86993389"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/70 transition-colors overflow-hidden border border-white/60"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="GitCode"
            >
              <img 
                src="/Gitcode-logo-favicon.png" 
                alt="GitCode" 
                className="w-5 h-5 object-contain"
              />
            </motion.a>
            <motion.a
              href="https://mail.qq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/70 transition-colors overflow-hidden border border-white/60"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="QQ邮箱"
            >
              <img 
                src="/qq_logo_icon_206694.svg" 
                alt="QQ邮箱" 
                className="w-5 h-5 object-contain"
              />
            </motion.a>
            <motion.a
              href="https://music.163.com/#/user/home?id=3966447555"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/70 transition-colors overflow-hidden border border-white/60"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="网易云音乐"
            >
              <img 
                src="/netease_cloud_music_logo_icon_206715.svg" 
                alt="网易云音乐" 
                className="w-5 h-5 object-contain"
              />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Announcement Card */}
      <motion.div
        className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:border-white/60 transition-all"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        whileHover={{ y: -2 }}
      >
        <motion.div
          className="flex items-center gap-2 mb-4"
          whileHover={{ x: 5 }}
        >
          <MessageSquare className="w-5 h-5 text-rose-500" />
          <h3 className="font-bold text-rose-900 drop-shadow-sm">公告</h3>
        </motion.div>
        <div className="text-rose-700 text-sm space-y-2 drop-shadow-sm">
          <p>2026.2.4创建</p>
          <p>计划添加音乐播放器</p>
          <p>正式书写博客</p>
        </div>
      </motion.div>

      {/* Hitokoto Card */}
      <motion.div
        className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:border-white/60 hover:shadow-xl hover:shadow-rose-100/20 transition-all"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        whileHover={{ y: -2 }}
      >
        <motion.div
          className="flex items-center gap-2 mb-4"
          whileHover={{ x: 5 }}
        >
          <Sparkles className="w-5 h-5 text-rose-500" />
          <h3 className="font-bold text-rose-900 drop-shadow-sm">一言</h3>
        </motion.div>
        <blockquote className="text-rose-700 italic mb-3 text-sm leading-relaxed drop-shadow-sm">
          "用心记录每一个瞬间，让成长有迹可循。"
        </blockquote>
        <p className="text-rose-500 text-xs drop-shadow-sm">— 喵酱留言</p>
      </motion.div>

    </aside>
  );
}


