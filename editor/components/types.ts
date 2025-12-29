export interface ConfigData {
  modules?: Record<string, string>;
  articles?: string;
  update?: string;
  seo?: string;
  beian?: string;
  cardVisibility?: string;
}

export interface ConfigEditorProps {
  activeTab: string;
  configData: ConfigData | null;
  onChange: (key: string, value: string | Record<string, string>) => void;
}

export interface HaloPost {
  spec: {
    title: string;
    slug: string;
    publishTime: string;
    categories?: string[];
    tags?: string[];
  };
  status: {
    permalink: string;
  };
  categories?: Array<{
    spec: {
      displayName: string;
      slug: string;
    };
  }>;
  tags?: Array<{
    spec: {
      displayName: string;
      slug: string;
    };
  }>;
}

export interface HaloResponse {
  items: HaloPost[];
  total: number;
}

export interface ArticleCategory {
  title: string;
  url: string;
  articles: Array<{
    title: string;
    url: string;
    time: string;
  }>;
}

export interface SyncStatus {
  type: 'idle' | 'success' | 'error';
  message: string;
}

export interface UrlConfig {
  latestPath: string;
  categoryPathPrefix: string;
}

export const moduleLabels: Record<string, string> = {
  basic: '基本信息',
  titleCards: '标题卡片',
  blogCard: '博客卡片',
  socialCards: '社交卡片',
  sectionTitles: '分区标题',
  projectCards: '项目卡片',
  diaryCards: '逛展日记',
  musicCards: '音乐创作',
  contactCards: '联系方式',
  cardVisibility: '卡片显示控制',
};
