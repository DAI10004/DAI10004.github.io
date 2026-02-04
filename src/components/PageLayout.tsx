'use client';

import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧边栏 - 移动端隐藏/显示，桌面端固定 */}
        <div className="hidden lg:block">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Sidebar 组件会在这里渲染 */}
            {children}
          </div>
        </div>

        {/* 右侧内容区 */}
        <div className="flex-1 min-w-0">
          {/* 内容在这里渲染 */}
        </div>
      </div>
    </div>
  );
}

// 用于包装有边栏的页面
export function SidebarLayout({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧边栏 */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            {sidebar}
          </div>
        </div>

        {/* 右侧内容区 */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
