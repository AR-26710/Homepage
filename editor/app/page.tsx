'use client';

import { useState, useEffect, useCallback } from 'react';
import ConfigEditor from '@/components/ConfigEditor';

interface ConfigData {
  modules?: Record<string, string>;
  articles?: string;
  update?: string;
  seo?: string;
  beian?: string;
  cardVisibility?: string;
  favicons?: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('adminActiveTab');
      return saved || 'modules';
    }
    return 'modules';
  });
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadConfig = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/config');
      const data = await response.json();
      setConfigData(data);
    } catch {
      showMessage('error', '加载配置失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  useEffect(() => {
    localStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  const saveConfig = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/config/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configData),
      });
      if (response.ok) {
        showMessage('success', '配置保存成功');
      } else {
        showMessage('error', '配置保存失败');
      }
    } catch {
      showMessage('error', '配置保存失败');
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const tabs = [
    { id: 'modules', label: '模块配置' },
    { id: 'articles', label: '文章列表' },
    { id: 'update', label: '更新配置' },
    { id: 'seo', label: 'SEO 配置' },
    { id: 'beian', label: '备案信息' },
    { id: 'cardVisibility', label: '卡片显示' },
    { id: 'favicons', label: '图标配置' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">个人主页配置管理</h1>
          <p className="text-gray-600">可视化配置您的个人主页内容</p>
        </div>

        {message && (
          <div className={`mb-4 p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <ConfigEditor
              activeTab={activeTab}
              configData={configData}
              onChange={(key, value) => setConfigData({ ...configData, [key]: value })}
            />
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-4">
            <button
              onClick={loadConfig}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              重置
            </button>
            <button
              onClick={saveConfig}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存配置'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
