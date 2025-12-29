import { ConfigData, moduleLabels } from '@/lib/types';
import ModuleSelector from './ModuleSelector';
import CodeEditor from './CodeEditor';

interface ModulesEditorProps {
  configData: ConfigData | null;
  activeModule: string;
  onModuleChange: (value: string) => void;
  onChange: (key: string, value: string | Record<string, string>) => void;
}

export default function ModulesEditor({ configData, activeModule, onModuleChange, onChange }: ModulesEditorProps) {
  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">模块化配置</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              配置已拆分为多个模块，请选择要编辑的模块。每个模块对应一个独立的配置文件，便于管理和维护。
            </p>
          </div>
        </div>
      </div>
      <ModuleSelector activeModule={activeModule} onChange={onModuleChange} />
      {configData?.modules && configData.modules[activeModule] && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-6 h-6 bg-linear-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">当前编辑: {moduleLabels[activeModule]}</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">modules/{activeModule}.ts</span>
          </div>
          <CodeEditor
            content={configData.modules[activeModule]}
            onChange={(value) => onChange('modules', { ...configData.modules, [activeModule]: value })}
            label={`${moduleLabels[activeModule]} 配置`}
            description={`编辑 ${moduleLabels[activeModule]} 模块的 TypeScript 配置文件`}
          />
        </div>
      )}
    </div>
  );
}
