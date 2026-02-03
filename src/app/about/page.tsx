export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          关于我
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">你好！</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              欢迎来到我的博客。我是一名热爱技术的开发者，
              主要关注前端开发、Web 技术和软件工程实践。
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              这个博客使用以下技术栈构建：
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Next.js 14（React 框架）</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>静态站点生成（SSG）</li>
              <li>GitHub Pages 部署</li>
              <li>GitHub Actions 自动化 CI/CD</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">为什么创建这个博客？</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              创建这个博客的目的是：
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>记录学习过程中的心得体会</li>
              <li>分享技术解决方案和最佳实践</li>
              <li>构建个人知识体系</li>
              <li>与其他开发者交流学习</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">技术栈说明</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              本博客采用静态站点生成（SSG）方式，这意味着：
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>所有页面在构建时生成</li>
              <li>无需运行时后端服务</li>
              <li>加载速度快，SEO 友好</li>
              <li>可以部署到静态托管服务（如 GitHub Pages）</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              博客内容以 Markdown 格式存储在 content/posts 目录下，
              使用 Next.js App Router 实现页面路由。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
