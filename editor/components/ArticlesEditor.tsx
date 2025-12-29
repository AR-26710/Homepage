import { useState, useEffect } from 'react';
import { ConfigData, SyncStatus, UrlConfig } from './types';
import { fetchHaloPosts, generateArticleCategoriesTS } from './api';
import CodeEditor from './CodeEditor';

interface ArticlesEditorProps {
  configData: ConfigData | null;
  onChange: (key: string, value: string | Record<string, string>) => void;
}

export default function ArticlesEditor({ configData, onChange }: ArticlesEditorProps) {
  const [apiUrl, setApiUrl] = useState<string>(() => {
    const saved = localStorage.getItem('halo_api_url');
    return saved || '';
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({ type: 'idle', message: '' });
  const [articlesPerCategory, setArticlesPerCategory] = useState<number>(() => {
    const saved = localStorage.getItem('halo_articles_per_category');
    return saved ? Number(saved) : 5;
  });
  const [isApiConfigExpanded, setIsApiConfigExpanded] = useState<boolean>(false);
  const [urlConfig, setUrlConfig] = useState<UrlConfig>(() => {
    const savedLatestPath = localStorage.getItem('halo_latest_path');
    const savedCategoryPrefix = localStorage.getItem('halo_category_path_prefix');
    return {
      latestPath: savedLatestPath || '/archives',
      categoryPathPrefix: savedCategoryPrefix || '/categories'
    };
  });

  useEffect(() => {
    localStorage.setItem('halo_api_url', apiUrl);
  }, [apiUrl]);

  useEffect(() => {
    localStorage.setItem('halo_latest_path', urlConfig.latestPath);
  }, [urlConfig.latestPath]);

  useEffect(() => {
    localStorage.setItem('halo_category_path_prefix', urlConfig.categoryPathPrefix);
  }, [urlConfig.categoryPathPrefix]);

  useEffect(() => {
    localStorage.setItem('halo_articles_per_category', String(articlesPerCategory));
  }, [articlesPerCategory]);

  const handleFetchHaloPosts = async (): Promise<void> => {
    setIsSyncing(true);
    setSyncStatus({ type: 'idle', message: '' });

    try {
      const { categories, total } = await fetchHaloPosts(apiUrl, articlesPerCategory, urlConfig);
      const tsContent = generateArticleCategoriesTS(categories, urlConfig);
      onChange('articles', tsContent);
      setSyncStatus({ type: 'success', message: `成功同步 ${total} 篇文章，${categories.length} 个分类` });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      setSyncStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-emerald-900 mb-2">文章列表配置</h3>
            <p className="text-sm text-emerald-700 leading-relaxed">
              直接编辑 TypeScript 配置文件，支持文章分类和文章列表配置。可以定义文章元数据、分类标签和展示顺序。
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <button
          onClick={() => setIsApiConfigExpanded(!isApiConfigExpanded)}
          className="w-full flex items-center justify-between p-6 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900">API 同步配置</label>
              <p className="text-xs text-gray-500">配置 Halo 博客 API 接口，自动同步文章数据</p>
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isApiConfigExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isApiConfigExpanded && (
          <div className="px-6 pb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API 接口地址</label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="http(s)://domain/apis/api.content.halo.run/v1alpha1/posts"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">最新文章路径</label>
                <input
                  type="text"
                  value={urlConfig.latestPath}
                  onChange={(e) => setUrlConfig({ ...urlConfig, latestPath: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="/archives"
                />
                <p className="text-xs text-gray-500 mt-1">最新文章页面的路径，如 /archives 或 /latest</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">分类路径前缀</label>
                <input
                  type="text"
                  value={urlConfig.categoryPathPrefix}
                  onChange={(e) => setUrlConfig({ ...urlConfig, categoryPathPrefix: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="/categories"
                />
                <p className="text-xs text-gray-500 mt-1">分类页面的路径前缀，如 /categories，完整链接为 {urlConfig.categoryPathPrefix}/分类名</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">每个分类文章数量</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={articlesPerCategory}
                  onChange={(e) => setArticlesPerCategory(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="10"
                />
                <p className="text-xs text-gray-500 mt-1">设置每个分类下显示的文章数量，不足则显示全部</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleFetchHaloPosts}
                  disabled={isSyncing}
                  className="px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSyncing ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      同步中...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      开始同步
                    </>
                  )}
                </button>

                {syncStatus.type !== 'idle' && (
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${syncStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {syncStatus.type === 'success' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span className="text-sm font-medium">{syncStatus.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <CodeEditor
        content={configData?.articles || ''}
        onChange={(value) => onChange('articles', value)}
        label="文章列表配置"
        description="配置文章数据、分类和元信息，支持动态内容管理"
      />
    </div>
  );
}
