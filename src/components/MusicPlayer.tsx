'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

// 音乐文件列表
const musicFiles = [
  {
    id: 1,
    src: '/musics/林宛瑜 - Rapeter.mp3',
    title: '林宛瑜 - Rapeter'
  },
  {
    id: 2,
    src: '/musics/星茶会 - 灰澈.mp3',
    title: '星茶会 - 灰澈'
  },
  {
    id: 3,
    src: '/musics/LIFE - Neuro-sama.mp3',
    title: 'LIFE - Neuro-sama'
  }
];

// 全局音频实例，确保页面跳转时音乐不中断
let globalAudioInstance: HTMLAudioElement | null = null;
let globalCurrentIndex = 0;

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(globalCurrentIndex);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 初始化音频实例
  useEffect(() => {
    if (!globalAudioInstance) {
      globalAudioInstance = new Audio(musicFiles[currentIndex].src);
      audioRef.current = globalAudioInstance;
    } else {
      audioRef.current = globalAudioInstance;
    }

    // 更新当前索引
    globalCurrentIndex = currentIndex;

    // 设置音频事件监听器
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => {
      // 播放下一首
      const nextIndex = (currentIndex + 1) % musicFiles.length;
      setCurrentIndex(nextIndex);
      globalCurrentIndex = nextIndex;
    };

    if (audio) {
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentIndex]);

  // 播放/暂停控制
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => {
          console.error('播放失败:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 上一首
  const playPrevious = () => {
    const prevIndex = (currentIndex - 1 + musicFiles.length) % musicFiles.length;
    setCurrentIndex(prevIndex);
    globalCurrentIndex = prevIndex;
    setIsPlaying(true);
  };

  // 下一首
  const playNext = () => {
    const nextIndex = (currentIndex + 1) % musicFiles.length;
    setCurrentIndex(nextIndex);
    globalCurrentIndex = nextIndex;
    setIsPlaying(true);
  };

  // 切换歌曲时更新音频源
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = musicFiles[currentIndex].src;
      if (isPlaying) {
        audio.play().catch(error => {
          console.error('播放失败:', error);
        });
      }
    }
  }, [currentIndex]);

  // 格式化时间
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="bg-white/30 backdrop-blur-md rounded-2xl p-4 border border-white/40 hover:border-white/60 transition-all"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      whileHover={{ y: -2 }}
    >
      <motion.div
        className="flex items-center gap-2 mb-3"
        whileHover={{ x: 5 }}
      >
        <Volume2 className="w-5 h-5 text-rose-500" />
        <h3 className="font-bold text-rose-900 drop-shadow-sm">音乐播放器</h3>
      </motion.div>

      {/* 歌曲标题 */}
      <div className="text-rose-700 text-sm mb-3 text-center truncate drop-shadow-sm">
        {musicFiles[currentIndex].title}
      </div>

      {/* 进度条 */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-rose-600 mb-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="w-full h-1 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center gap-4">
        <motion.button
          className="w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center text-rose-500 hover:bg-white/70 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={playPrevious}
        >
          <SkipBack className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white hover:opacity-90 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </motion.button>
        
        <motion.button
          className="w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center text-rose-500 hover:bg-white/70 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={playNext}
        >
          <SkipForward className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
