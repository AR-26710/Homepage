export interface CardConfig {
  title: string;
  url: string;
  iconClass?: string;
  bgStyle?: string;
  btnText?: string;
  textStyle?: string;
  btnStyle?: string;
  btnTextStyle?: string;
  desc?: string;
  subdesc?: string;
  fulldesc?: string;
}

export interface SectionTitle {
  title: string;
}

export interface InfoConfig {
  title: string;
  desc: string;
  imgUrl: string;
  location: string;
  titleCard: CardConfig;
  cvTitleCard: CardConfig;
  blogCard: CardConfig;
  secondaryCards: CardConfig[];
  primaryCards: CardConfig[];
  sectionTitles: SectionTitle[];
  projectCardStart: CardConfig;
  projectCards: CardConfig[];
  projectCardEnd: CardConfig;
  diaryCards: CardConfig[];
  musicCards: CardConfig[];
  teleCards: CardConfig[];
}

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

export interface UpdateConfig {
  className: string;
  updateUrl: string;
}
