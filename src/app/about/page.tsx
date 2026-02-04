'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone } from 'lucide-react';
import { SidebarLayout } from '@/components/PageLayout';
import Sidebar from '@/components/Sidebar';

export default function About() {
  const [displayText, setDisplayText] = useState('');
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const sentences = [
    '欢迎来到我的博客站',
    '我是喵酱&miaojiang'
  ];
  
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenSentences = 1500;
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isDeleting) {
      // 删除文字
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // 删除完成，切换到下一句
        setIsDeleting(false);
        setCurrentSentence((currentSentence + 1) % sentences.length);
      }
    } else {
      // 打字
      if (displayText.length < sentences[currentSentence].length) {
        timeoutId = setTimeout(() => {
          setDisplayText(sentences[currentSentence].substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // 打字完成，等待一段时间后开始删除
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenSentences);
      }
    }
    
    return () => clearTimeout(timeoutId);
  }, [displayText, currentSentence, isDeleting]);

  return (
    <SidebarLayout
      sidebar={<Sidebar />}
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-6 text-rose-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hi there
            </motion.h1>
            
            <motion.div
              className="text-xl md:text-2xl font-medium text-rose-700 mb-8 min-h-[60px] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {displayText}
              <motion.span
                className="inline-block w-2 h-6 bg-rose-500 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            </motion.div>
          </motion.div>
        </section>
        
        {/* About Section */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center">
                <User className="w-5 h-5 text-rose-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-rose-900">关于我</h2>
            </div>
            
            <div className="text-lg text-rose-700 leading-relaxed">
              <p>
                我是喵酱，对编程和一些新鲜技术非常好奇。目前是一名计科学生，平时偶尔发现一些有趣技术或者有什么研究想法会记录下来，于是这个网站将会呈现一些有趣的内容
              </p>
            </div>
          </motion.div>
        </section>
        
        {/* Contact Section */}
        <section className="py-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center">
                <Mail className="w-5 h-5 text-rose-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-rose-900">联系方式</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center">
                  <Phone className="w-5 h-5 text-rose-500" />
                </div>
                <div className="text-lg text-rose-700">
                  QQ：2442517500
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center">
                  <Mail className="w-5 h-5 text-rose-500" />
                </div>
                <div className="text-lg text-rose-700">
                  Gmail：xiaodaiheng@gmail.com
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </SidebarLayout>
  );
}
