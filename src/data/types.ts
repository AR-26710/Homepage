// ===== 文章相关 =====
export interface Article {
  title: string;
  url: string;
  time: string;
}

export interface ArticleCategory {
  title: string;
  url: string;
  articles: Article[];
}

// ===== 卡片相关 =====
export interface Card2x1Props {
  title: string;
  url: string;
  iconClass?: string;
  textStyle?: string;
  bgStyle?: string;
  btnText?: string;
  btnStyle?: string;
}

export interface Card4x2Props {
  title: string;
  desc?: string;
  subdesc?: string;
  thirddesc?: string;
  url: string;
  btnText: string;
  bgStyle: string;
  textStyle?: string;
  btnStyle?: string;
  btnTextStyle?: string;
}

export interface Card2x2Props {
  title: string;
  desc?: string;
  fulldesc?: string;
  subdesc?: string;
  url: string;
  btnText: string;
  btnTextFull?: string;
  bgStyle: string;
  btnStyle?: string;
  textStyle?: string;
  updateUrl?: string;
}

export interface Card2x3Props {
  title: string;
  url: string;
  bgStyle?: string;
  textStyle?: string;
}

export interface SectionTitleProps {
  title: string;
}

// ===== 卡片可见性 =====
export interface CardVisibility {
  showTitleCard: boolean;
  showBlogCard: boolean;
  showPrimaryCards: boolean;
  showArticlesSection: boolean;
  showProjectsSection: boolean;
  showDiarySection: boolean;
  showMusicSection: boolean;
  showPrimaryCardsMobile: boolean;
  showContactSection: boolean;
  order?: string[];
}

// ===== 站点配置聚合类型 =====
export interface SiteConfig {
  title: string;
  desc: string;
  imgUrl: string;
  location: string;
  lastUpdate?: string;
  titleCard: Card4x2Props;
  blogCard: Card4x2Props;
  primaryCards: Card2x1Props[];
  sectionTitles: SectionTitleProps[];
  projectCardStart: Card4x2Props;
  projectCards: Card2x2Props[];
  projectCardEnd: Card4x2Props;
  diaryCards: Card2x3Props[];
  musicCards: Card4x2Props[];
  teleCards: Card2x1Props[];
  cardVisibility: CardVisibility;
}
