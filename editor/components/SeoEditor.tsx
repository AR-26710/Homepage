import { ConfigData } from '@/lib/types';
import CodeEditor from './CodeEditor';

interface SeoEditorProps {
  configData: ConfigData | null;
  onChange: (key: string, value: string | Record<string, string>) => void;
}

export default function SeoEditor({ configData, onChange }: SeoEditorProps) {
  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-purple-900 mb-2">SEO 配置</h3>
            <p className="text-sm text-purple-700 leading-relaxed">
              配置网站的 SEO 元数据，包括标题、描述、Open Graph 标签等。这些信息有助于搜索引擎优化和社交媒体分享。
            </p>
          </div>
        </div>
      </div>
      {configData?.seo && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-6 h-6 bg-linear-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">当前编辑: SEO 配置</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">data/seo.ts</span>
          </div>
          <CodeEditor
            content={configData.seo}
            onChange={(value) => onChange('seo', value)}
            label="SEO 配置"
            description="编辑网站的 SEO 元数据配置文件"
          />
        </div>
      )}
    </div>
  );
}
