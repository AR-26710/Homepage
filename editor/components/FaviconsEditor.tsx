import { ConfigData } from './types';
import CodeEditor from './CodeEditor';

interface FaviconsEditorProps {
  configData: ConfigData | null;
  onChange: (key: string, value: string | Record<string, string>) => void;
}

export default function FaviconsEditor({ configData, onChange }: FaviconsEditorProps) {
  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-orange-900 mb-2">图标配置</h3>
            <p className="text-sm text-orange-700 leading-relaxed">
              配置网站的图标文件，包括网站图标、Apple 触摸图标、不同尺寸的 favicon 等。这些图标会在浏览器标签页、书签和移动设备主屏幕上显示。
            </p>
          </div>
        </div>
      </div>
      {configData?.favicons && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-6 h-6 bg-linear-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">当前编辑: 图标配置</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">data/favicons.ts</span>
          </div>
          <CodeEditor
            content={configData.favicons}
            onChange={(value) => onChange('favicons', value)}
            label="图标配置"
            description="编辑网站的图标路径配置文件"
          />
        </div>
      )}
    </div>
  );
}
