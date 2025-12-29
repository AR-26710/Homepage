'use client';

import { useMemo } from 'react';
import { ConfigData } from './types';

interface CardVisibilityEditorProps {
  configData: ConfigData | null;
  onChange: (key: string, value: string | Record<string, string>) => void;
}

interface VisibilityConfig {
  showTitleCard: boolean;
  showBlogCard: boolean;
  showPrimaryCards: boolean;
  showArticlesSection: boolean;
  showProjectsSection: boolean;
  showDiarySection: boolean;
  showMusicSection: boolean;
  showPrimaryCardsMobile: boolean;
  showContactSection: boolean;
}

const cardOptions = [
  { key: 'showTitleCard', label: '标题卡片', description: '显示个人标题卡片' },
  { key: 'showBlogCard', label: '博客卡片', description: '显示博客链接卡片' },
  { key: 'showPrimaryCards', label: '社交卡片（桌面端）', description: '桌面端显示社交链接卡片' },
  { key: 'showArticlesSection', label: '文章列表', description: '显示文章列表分区' },
  { key: 'showProjectsSection', label: '个人项目', description: '显示个人项目分区' },
  { key: 'showDiarySection', label: '逛展日记', description: '显示逛展日记分区' },
  { key: 'showMusicSection', label: '音乐创作', description: '显示音乐创作分区' },
  { key: 'showPrimaryCardsMobile', label: '社交卡片（移动端）', description: '移动端显示社交链接卡片' },
  { key: 'showContactSection', label: '联系方式', description: '显示联系方式分区' },
];

export default function CardVisibilityEditor({ configData, onChange }: CardVisibilityEditorProps) {
  const visibilityConfig = useMemo(() => {
    const defaultConfig: VisibilityConfig = {
      showTitleCard: true,
      showBlogCard: true,
      showPrimaryCards: true,
      showArticlesSection: true,
      showProjectsSection: true,
      showDiarySection: true,
      showMusicSection: true,
      showPrimaryCardsMobile: true,
      showContactSection: true,
    };

    if (configData?.cardVisibility) {
      try {
        const content = configData.cardVisibility;
        const objectMatch = content.match(/export\s+default\s+({[\s\S]*})/);
        if (objectMatch && objectMatch[1]) {
          const parsed = new Function(`return ${objectMatch[1]}`)();
          return { ...defaultConfig, ...parsed };
        }
      } catch {
        console.error('无法解析卡片可见性配置。');
      }
    }
    
    return defaultConfig;
  }, [configData?.cardVisibility]);

  const handleToggle = (key: keyof VisibilityConfig) => {
    const newConfig = { ...visibilityConfig, [key]: !visibilityConfig[key] };
    const configString = `export default {\n${Object.entries(newConfig)
      .map(([k, v]) => `  ${k}: ${v},`)
      .join('\n')}\n};`;
    onChange('cardVisibility', configString);
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-cyan-900 mb-2">卡片显示控制</h3>
            <p className="text-sm text-cyan-700 leading-relaxed">
              控制首页各个卡片的显示与隐藏。通过开关可以快速调整页面布局，隐藏不需要的内容模块。
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="grid gap-4">
          {cardOptions.map((option) => (
            <div
              key={option.key}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </div>
              <button
                onClick={() => handleToggle(option.key as keyof VisibilityConfig)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  visibilityConfig[option.key as keyof VisibilityConfig]
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    visibilityConfig[option.key as keyof VisibilityConfig]
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
