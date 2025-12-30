import { HaloResponse, ArticleCategory, UrlConfig } from './types';

export async function fetchHaloPosts(
  apiUrl: string,
  articlesPerCategory: number,
  urlConfig: UrlConfig
): Promise<{ categories: ArticleCategory[]; total: number }> {
  if (!apiUrl || apiUrl.trim() === '') {
    throw new Error('请先填写 API 接口地址');
  }

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
  }

  const data: HaloResponse = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error('未获取到文章数据');
  }

  const urlObj = new URL(apiUrl);
  const blogBaseUrl = `${urlObj.protocol}//${urlObj.host}`;

  const categoriesMap = new Map<string, ArticleCategory>();

  categoriesMap.set('最新', {
    title: '最新',
    url: `${blogBaseUrl}${urlConfig.latestPath}`,
    articles: []
  });

  data.items.forEach((post) => {
    let articleUrl = post.status.permalink;
    if (articleUrl.startsWith('/')) {
      articleUrl = `${blogBaseUrl}${articleUrl}`;
    }

    const article = {
      title: post.spec.title,
      url: articleUrl,
      time: post.spec.publishTime ? new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(new Date(post.spec.publishTime)) : ''
    };

    categoriesMap.get('最新')?.articles.push(article);

    const postCategories = post.categories || [];
    if (postCategories.length === 0) {
      const uncategorizedKey = '未分类';
      if (!categoriesMap.has(uncategorizedKey)) {
        categoriesMap.set(uncategorizedKey, {
          title: uncategorizedKey,
          url: '#',
          articles: []
        });
      }
      categoriesMap.get(uncategorizedKey)?.articles.push(article);
    } else {
      postCategories.forEach((category) => {
        const key = category.spec.displayName;
        if (!categoriesMap.has(key)) {
          categoriesMap.set(key, {
            title: key,
            url: `${blogBaseUrl}${urlConfig.categoryPathPrefix}/${category.spec.slug}`,
            articles: []
          });
        }
        categoriesMap.get(key)?.articles.push(article);
      });
    }
  });

  const categories = Array.from(categoriesMap.values()).map(category => ({
    ...category,
    articles: category.articles.slice(0, articlesPerCategory)
  })).sort((a, b) => {
    if (a.title === '最新') return -1;
    if (b.title === '最新') return 1;
    return a.title.localeCompare(b.title, 'zh-CN');
  });

  return { categories, total: data.total };
}

export function generateArticleCategoriesTS(categories: ArticleCategory[], urlConfig: UrlConfig): string {
  return `import type { ArticleCategory } from '../../src/data/types';

export const articleCategories: ArticleCategory[] = ${JSON.stringify(categories, null, 2)};

export default articleCategories;`;
}
