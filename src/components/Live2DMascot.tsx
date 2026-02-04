'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function Live2DMascot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const live2dRef = useRef<any>(null);

  // 初始化 Live2D
  useEffect(() => {
    if (!containerRef.current || !isVisible) return;

    let isMounted = true;

    const initLive2D = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        if (!isMounted || !containerRef.current) return;

        const { wlLive2d } = await import('wl-live2d');
        
        live2dRef.current = wlLive2d({
          el: containerRef.current,
          models: [
            {
              path: '/live2d-model/model.model3.json',
              scale: 0.7,
            },
          ],
          tips: {
            duration: 6000,
            message: [
              '你好呀！欢迎来到喵酱的博客~',
              '今天也要加油哦！',
              '有好好写代码吗？',
              '波奇酱在这里陪你！',
              '喵酱永远喜欢波奇酱！',
              '波奇酱永远喜欢喵酱！',
            ],
          },
          // 禁用拖动，保留鼠标跟踪
          drag: false,
          hit: true,
          autoMotion: true,
        } as any);

        // 只禁用选择，保留事件监听
        const canvas = containerRef.current.querySelector('canvas');
        if (canvas) {
          canvas.style.userSelect = 'none';
          canvas.style.touchAction = 'none';
        }

        // 只禁用选择，保留事件监听
        containerRef.current.style.userSelect = 'none';
        containerRef.current.style.touchAction = 'none';
      } catch (error) {
        console.error('Live2D 初始化失败:', error);
      }
    };

    initLive2D();

    return () => {
      isMounted = false;
      if (live2dRef.current?.destroy) {
        live2dRef.current.destroy();
      }
    };
  }, [isVisible]);

  if (!isVisible) {
    return (
      <button
        type="button"
        className="fixed bottom-5 right-5 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/60 text-rose-500 hover:bg-white hover:scale-110 active:scale-95 transition-all"
        onClick={() => setIsVisible(true)}
        title="显示看板娘"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Live2D 容器 - 放大尺寸 */}
      <div
        ref={containerRef}
        className="w-[280px] h-[350px] rounded-2xl overflow-hidden"
      />
    </div>
  );
}
