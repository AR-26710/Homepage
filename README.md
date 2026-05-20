# Homepage

> 呀哈喽的个人主页，二开于[idealclover](https://github.com/idealclover)的[Homepage](https://github.com/idealclover/Homepage)项目。

预览地址 [www.houxiongxiong.icu](https://www.houxiongxiong.icu)

## ✨ 功能特性

- 🌐 响应式设计，适配手机/平板/电脑不同设备
- 🚀 体积小巧，打包后 HTML+CSS 100KB 内
- 🀄️ 使用字体子集化，最大化压缩字体文件
- ⭐️ 自动获取知乎等平台粉丝数 using [spencerwooo/Substats](https://github.com/spencerwooo/Substats)
- 🌓 根据时间自动切换暗夜模式
- 📱 PWA 支持，可安装为移动端应用
- 🔍 完整的 SEO 元标签支持（Open Graph、Twitter Card）
- 🎛️ 可视化配置编辑器（基于 Next.js）
- 🔄 GitHub Actions 自动同步 [Halo](https://github.com/halo-dev/halo) 文章、更新 B 站播放量等数据
- 📋 模块化卡片系统，支持自定义卡片可见性和排序

## 📦 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

### 编辑器

项目包含一个基于 Next.js 的可视化配置编辑器，位于 `editor/` 目录：

```bash
cd editor
pnpm install
pnpm dev
```

同时启动主页和编辑器：

```bash
pnpm dev:all
```

## 📄 目录结构

```
├── .github/
│   └── workflows/          -- GitHub Actions 自动化
│       ├── sync-all.yml
│       ├── sync-halo-articles.yml
│       ├── update-bilibili-views.yml
│       └── update-last-update.yml
├── build/
│   ├── fontmin.js          -- 字体压缩脚本
│   ├── postbuild.js         -- build 后脚本
│   └── prebuild.js          -- build 前脚本
├── editor/                  -- 可视化配置编辑器（Next.js）
│   ├── app/                 -- Next.js App Router
│   ├── components/          -- 编辑器组件
│   └── lib/                 -- 类型定义和 API
├── public/
│   ├── favicons/            -- 各尺寸图标
│   ├── fonts/               -- 字体
│   ├── icons/               -- 压缩后图标库
│   ├── libs/                -- 第三方库
│   └── registerSW.js        -- PWA Service Worker 注册
├── scripts/
│   ├── syncHaloArticles.js  -- 同步 Halo 博客文章
│   ├── updateBilibiliViews.js -- 更新 B 站播放量
│   └── updateLastUpdate.js  -- 更新最后修改时间
├── src/
│   ├── components/
│   │   ├── app.astro        -- 主页面布局
│   │   ├── ArticlesList.astro -- 文章列表
│   │   ├── ImageCard.astro  -- 图片卡片
│   │   ├── InfoCard.astro   -- 信息卡片
│   │   ├── LinkCard.astro   -- 链接卡片
│   │   ├── ProjectCard.astro -- 项目卡片
│   │   └── SectionTitle.astro -- 分区标题
│   ├── data/
│   │   ├── modules/         -- 模块化数据配置
│   │   │   ├── basic.ts     -- 基础信息
│   │   │   ├── titleCards.ts
│   │   │   ├── blogCard.ts
│   │   │   ├── socialCards.ts
│   │   │   ├── projectCards.ts
│   │   │   ├── diaryCards.ts
│   │   │   ├── musicCards.ts
│   │   │   ├── contactCards.ts
│   │   │   ├── sectionTitles.ts
│   │   │   └── cardVisibility.ts
│   │   ├── articles_list.ts -- 文章数据
│   │   ├── beian.ts         -- 备案信息
│   │   ├── favicons.ts      -- 图标配置
│   │   ├── info.ts          -- 站点配置聚合
│   │   ├── seo.ts           -- SEO 配置
│   │   ├── types.ts         -- TypeScript 类型定义
│   │   └── update.ts        -- 粉丝数接口配置
│   └── pages/
│       └── index.astro      -- 首页
├── astro.config.mjs         -- Astro 配置（含 PWA）
├── tailwind.config.js       -- Tailwind CSS 配置
├── tsconfig.json            -- TypeScript 配置
└── package.json             -- 项目配置文件
```

## 📃 许可证

本项目采用 MIT 许可证，详情请参阅 [LICENSE](./LICENSE) 文件。

## 🙏 致谢

- [Astro](https://astro.build/) - 构建该网站的现代静态站点构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [bento.me](https://bento.me/) - 设计灵感来源

## 👨‍💻 原作者 idealclover

- 网站：[idealclover.top](https://idealclover.top)
- GitHub：[@idealclover](https://github.com/idealclover)
- 邮箱：idealclover@163.com
