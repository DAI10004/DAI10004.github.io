'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-xl z-50 border-b border-white/40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-rose-400" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              MiaoBlog
            </span>
          </Link>
        </motion.div>
        <nav className="hidden md:flex space-x-8">
          {
            [
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/blog', label: 'Blog' }
            ].map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Link
                href={item.href}
                className="relative text-sakura-600 hover:text-rose-500 transition-colors font-medium group"
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-purple-400 group-hover:w-full transition-all duration-300"
                  initial={false}
                />
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
