import { NextResponse } from 'next/server';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

interface ConfigData {
  modules?: Record<string, string>;
  articles?: string;
  update?: string;
  seo?: string;
  beian?: string;
  cardVisibility?: string;
  favicons?: string;
  pwa?: string;
}

export async function GET() {
  try {
    const parentDir = join(process.cwd(), '..');
    const modulesPath = join(parentDir, 'src', 'data', 'modules');
    const articlesPath = join(parentDir, 'src', 'data', 'articles_list.ts');
    const updatePath = join(parentDir, 'src', 'data', 'update.ts');
    const seoPath = join(parentDir, 'src', 'data', 'seo.ts');
    const beianPath = join(parentDir, 'src', 'data', 'beian.ts');
    const cardVisibilityPath = join(parentDir, 'src', 'data', 'modules', 'cardVisibility.ts');
    const faviconsPath = join(parentDir, 'src', 'data', 'favicons.ts');
    const pwaPath = join(parentDir, 'astro.config.mjs');

    const data: ConfigData = {};

    if (existsSync(modulesPath)) {
      const moduleFiles = readdirSync(modulesPath).filter(file => file.endsWith('.ts'));
      data.modules = {};
      
      for (const file of moduleFiles) {
        const modulePath = join(modulesPath, file);
        const moduleName = file.replace('.ts', '');
        data.modules[moduleName] = readFileSync(modulePath, 'utf-8');
      }
    }

    if (existsSync(articlesPath)) {
      data.articles = readFileSync(articlesPath, 'utf-8');
    }

    if (existsSync(updatePath)) {
      data.update = readFileSync(updatePath, 'utf-8');
    }

    if (existsSync(seoPath)) {
      data.seo = readFileSync(seoPath, 'utf-8');
    }

    if (existsSync(beianPath)) {
      data.beian = readFileSync(beianPath, 'utf-8');
    }

    if (existsSync(cardVisibilityPath)) {
      data.cardVisibility = readFileSync(cardVisibilityPath, 'utf-8');
    }

    if (existsSync(faviconsPath)) {
      data.favicons = readFileSync(faviconsPath, 'utf-8');
    }

    if (existsSync(pwaPath)) {
      data.pwa = readFileSync(pwaPath, 'utf-8');
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to read config files' }, { status: 500 });
  }
}
