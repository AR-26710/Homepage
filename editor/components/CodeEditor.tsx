interface CodeEditorProps {
  content: string;
  onChange: (value: string) => void;
  label: string;
  description?: string;
}

export default function CodeEditor({ content, onChange, label, description }: CodeEditorProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-[#f5f5f5] px-4 py-3 border-b border-gray-200 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-[#ff5f56] rounded-full shadow-sm hover:opacity-80 transition-opacity cursor-pointer"></div>
            <div className="w-3 h-3 bg-[#ffbd2e] rounded-full shadow-sm hover:opacity-80 transition-opacity cursor-pointer"></div>
            <div className="w-3 h-3 bg-[#27c93f] rounded-full shadow-sm hover:opacity-80 transition-opacity cursor-pointer"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs font-mono text-gray-600">{label}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-5 bg-white rounded-md flex items-center justify-center border border-gray-200">
              <span className="text-[10px] text-gray-500 font-mono">TS</span>
            </div>
          </div>
        </div>
        {description && (
          <p className="text-xs text-gray-500 mt-2 font-normal text-center">{description}</p>
        )}
      </div>
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[500px] p-6 font-mono text-sm bg-[#fafafa] text-gray-800 focus:outline-none focus:bg-white transition-all duration-200 resize-none leading-relaxed selection:bg-[#add6ff]"
          spellCheck={false}
          placeholder="开始编写配置代码..."
        />
        <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200 font-mono">
          {content.split('\n').length} 行
        </div>
      </div>
    </div>
  );
}
