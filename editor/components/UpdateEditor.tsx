import { ConfigData } from './types';
import CodeEditor from './CodeEditor';

interface UpdateEditorProps {
  configData: ConfigData | null;
  onChange: (key: string, value: string | Record<string, string>) => void;
}

export default function UpdateEditor({ configData, onChange }: UpdateEditorProps) {
  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-purple-900 mb-2">更新 API 配置</h3>
            <p className="text-sm text-purple-700 leading-relaxed">
              配置各个平台的实时更新 API，用于动态获取粉丝数、点赞数等数据。支持多平台数据同步和缓存策略。
            </p>
          </div>
        </div>
      </div>
      <CodeEditor
        content={configData?.update || ''}
        onChange={(value) => onChange('update', value)}
        label="更新 API 配置"
        description="配置各平台 API 端点、认证信息和更新策略"
      />
    </div>
  );
}
