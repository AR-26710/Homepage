'use client';

import { useState } from 'react';
import { ConfigData } from './types';
import CodeEditor from './CodeEditor';

interface PwaEditorProps {
  configData: ConfigData | null;
  onChange: (key: string, value: string | Record<string, string>) => void;
}

export default function PwaEditor({ configData, onChange }: PwaEditorProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">PWA 配置</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              配置渐进式 Web 应用（PWA）功能，包括应用名称、图标、主题色等。PWA 可以让您的网站像原生应用一样安装到设备上，支持离线访问。
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900">PWA 功能特性</h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              可安装到桌面/主屏幕
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              离线访问支持
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              自动更新 Service Worker
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              静态资源预缓存
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              iOS 和 Android 设备支持
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900">配置说明</h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              配置文件位于 astro.config.mjs
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              修改后需要重新构建项目
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              图标需放在 public/favicons 目录
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              建议使用 192x192 和 512x512 图标
            </li>
          </ul>
        </div>
      </div>

      {configData?.pwa && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">当前编辑: PWA 配置</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">astro.config.mjs</span>
          </div>
          <CodeEditor
            content={configData.pwa}
            onChange={(value) => onChange('pwa', value)}
            label="PWA 配置"
            description="编辑 PWA 配置文件，包括 manifest、缓存策略等"
          />
        </div>
      )}

      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <svg className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {showAdvanced ? '收起' : '展开'}高级配置说明
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Manifest 配置项</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">name</span>
                  <p className="text-gray-600">应用完整名称</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">short_name</span>
                  <p className="text-gray-600">应用短名称（主屏幕显示）</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">description</span>
                  <p className="text-gray-600">应用描述</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">theme_color</span>
                  <p className="text-gray-600">主题颜色</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">background_color</span>
                  <p className="text-gray-600">背景颜色</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">display</span>
                  <p className="text-gray-600">显示模式（standalone/fullscreen）</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">缓存策略说明</h5>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">CacheFirst</span>
                  <p className="text-gray-600">优先从缓存读取，适用于不常变化的资源（如字体）</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">NetworkFirst</span>
                  <p className="text-gray-600">优先从网络获取，失败时使用缓存，适用于动态内容</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">StaleWhileRevalidate</span>
                  <p className="text-gray-600">先返回缓存，同时在后台更新</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">注意事项</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>修改 PWA 配置后需要运行 <code className="bg-yellow-100 px-1 rounded">npm run build</code> 重新构建</li>
                    <li>Service Worker 只在 HTTPS 或 localhost 环境下工作</li>
                    <li>图标文件路径需要相对于 public 目录</li>
                    <li>manifest 文件会自动生成，无需手动创建</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
