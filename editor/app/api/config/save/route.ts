import { NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { modules, articles, update, seo, beian, cardVisibility } = body;

    const parentDir = join(process.cwd(), '..');
    const modulesPath = join(parentDir, 'src', 'data', 'modules');
    const articlesPath = join(parentDir, 'src', 'data', 'articles_list.ts');
    const updatePath = join(parentDir, 'src', 'data', 'update.ts');
    const seoPath = join(parentDir, 'src', 'data', 'seo.ts');
    const beianPath = join(parentDir, 'src', 'data', 'beian.ts');
    const cardVisibilityPath = join(parentDir, 'src', 'data', 'modules', 'cardVisibility.ts');

    if (modules) {
      for (const [moduleName, content] of Object.entries(modules)) {
        const modulePath = join(modulesPath, `${moduleName}.ts`);
        writeFileSync(modulePath, content as string, 'utf-8');
      }
    }

    if (articles) {
      writeFileSync(articlesPath, articles as string, 'utf-8');
    }

    if (update) {
      writeFileSync(updatePath, update as string, 'utf-8');
    }

    if (seo) {
      writeFileSync(seoPath, seo as string, 'utf-8');
    }

    if (beian) {
      writeFileSync(beianPath, beian as string, 'utf-8');
    }

    if (cardVisibility) {
      writeFileSync(cardVisibilityPath, cardVisibility as string, 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save config files' }, { status: 500 });
  }
}
