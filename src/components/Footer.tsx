const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-8 border-t border-gray-900 mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400">
            © {currentYear} 我的博客. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
}
