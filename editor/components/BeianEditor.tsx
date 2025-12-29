import { ConfigData } from './types';
import CodeEditor from './CodeEditor';

interface BeianEditorProps {
  configData: ConfigData | null;
  onChange: (key: string, value: string | Record<string, string>) => void;
}

export default function BeianEditor({ configData, onChange }: BeianEditorProps) {
  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">备案信息配置</h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              配置网站的备案信息，包括 ICP 备案号和公安备案号。这些信息将显示在网站页脚。
            </p>
          </div>
        </div>
      </div>
      {configData?.beian && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-6 h-6 bg-linear-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">当前编辑: 备案信息</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">data/beian.ts</span>
          </div>
          <CodeEditor
            content={configData.beian}
            onChange={(value) => onChange('beian', value)}
            label="备案信息配置"
            description="编辑网站的备案信息配置文件"
          />
        </div>
      )}
    </div>
  );
}
