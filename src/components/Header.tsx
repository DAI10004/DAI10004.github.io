import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          我的博客
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            首页
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            关于
          </Link>
          <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
            博客
          </Link>
        </nav>
      </div>
    </header>
  );
}
