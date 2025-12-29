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