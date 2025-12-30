'use client';

import { useState } from 'react';
import { ConfigEditorProps } from './types';
import ModulesEditor from './ModulesEditor';
import ArticlesEditor from './ArticlesEditor';
import UpdateEditor from './UpdateEditor';
import SeoEditor from './SeoEditor';
import BeianEditor from './BeianEditor';
import CardVisibilityEditor from './CardVisibilityEditor';
import FaviconsEditor from './FaviconsEditor';

export default function ConfigEditor({ activeTab, configData, onChange }: ConfigEditorProps) {
  const [activeModule, setActiveModule] = useState<string>('basic');

  return (
    <div className="space-y-8">
      {activeTab === 'modules' && (
        <ModulesEditor
          configData={configData}
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          onChange={onChange}
        />
      )}
      {activeTab === 'articles' && (
        <ArticlesEditor
          configData={configData}
          onChange={onChange}
        />
      )}
      {activeTab === 'update' && (
        <UpdateEditor
          configData={configData}
          onChange={onChange}
        />
      )}
      {activeTab === 'seo' && (
        <SeoEditor
          configData={configData}
          onChange={onChange}
        />
      )}
      {activeTab === 'beian' && (
        <BeianEditor
          configData={configData}
          onChange={onChange}
        />
      )}
      {activeTab === 'cardVisibility' && (
        <CardVisibilityEditor
          configData={configData}
          onChange={onChange}
        />
      )}
      {activeTab === 'favicons' && (
        <FaviconsEditor
          configData={configData}
          onChange={onChange}
        />
      )}
    </div>
  );
}
