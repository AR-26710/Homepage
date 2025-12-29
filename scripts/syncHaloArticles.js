import { readFileSync, writeFileSync, existsSync } from 'fs';

const API_URL = process.env.HALO_API_URL || '';
const LATEST_PATH = process.env.HALO_LATEST_PATH || '/archives';
const CATEGORY_PATH_PREFIX = process.env.HALO_CATEGORY_PATH_PREFIX || '/categories';
const ARTICLES_PER_CATEGORY = parseInt(process.env.HALO_ARTICLES_PER_CATEGORY || '5', 10);
const ARTICLES_FILE_PATH = './src/data/articles_list.ts';

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

async function fetchHaloPosts(apiUrl, articlesPerCategory, urlConfig) {
  if (!apiUrl || apiUrl.trim() === '') {
    throw new Error('请先填写 API 接口地址');
  }

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error('未获取到文章数据');
  }

  const urlObj = new URL(apiUrl);
  const blogBaseUrl = `${urlObj.protocol}//${urlObj.host}`;

  const categoriesMap = new Map();

  categoriesMap.set('最新', {
    title: '最新',
    url: `${blogBaseUrl}${urlConfig.latestPath}`,
    articles: []
  });

  for (const post of data.items) {
    let articleUrl = post.status.permalink;
    if (articleUrl.startsWith('/')) {
      articleUrl = `${blogBaseUrl}${articleUrl}`;
    }

    const article = {
      title: post.spec.title,
      url: articleUrl,
      time: post.spec.publishTime ? dateFormatter.format(new Date(post.spec.publishTime)) : ''
    };

    categoriesMap.get('最新').articles.push(article);

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
      categoriesMap.get(uncategorizedKey).articles.push(article);
    } else {
      for (const category of postCategories) {
        const key = category.spec.displayName;
        if (!categoriesMap.has(key)) {
          categoriesMap.set(key, {
            title: key,
            url: `${blogBaseUrl}${urlConfig.categoryPathPrefix}/${category.spec.slug}`,
            articles: []
          });
        }
        categoriesMap.get(key).articles.push(article);
      }
    }
  }

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

function generateArticleCategoriesTS(categories) {
  return `import type { ArticleCategory } from './types';

export const articleCategories: ArticleCategory[] = ${JSON.stringify(categories, null, 2)};

export default articleCategories;`;
}

async function main() {
  try {
    console.log('开始同步 Halo 文章...');
    console.log(`API URL: ${API_URL}`);
    console.log(`每分类文章数: ${ARTICLES_PER_CATEGORY}`);

    const urlConfig = {
      latestPath: LATEST_PATH,
      categoryPathPrefix: CATEGORY_PATH_PREFIX
    };

    const { categories, total } = await fetchHaloPosts(API_URL, ARTICLES_PER_CATEGORY, urlConfig);
    const tsContent = generateArticleCategoriesTS(categories);

    const existingContent = existsSync(ARTICLES_FILE_PATH) ? readFileSync(ARTICLES_FILE_PATH, 'utf-8') : '';

    if (existingContent === tsContent) {
      console.log('文章内容未发生变化，无需更新');
      return;
    }

    writeFileSync(ARTICLES_FILE_PATH, tsContent, 'utf-8');
    console.log(`成功同步 ${total} 篇文章，${categories.length} 个分类`);
  } catch (error) {
    console.error('同步失败:', error.message);
    process.exit(1);
  }
}

main();
