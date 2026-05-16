import fs from 'node:fs';
import path from 'node:path';

export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  read: string;
  category: string;
}

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export function getAllBlogMeta(): BlogMeta[] {
  if (!fs.existsSync(BLOG_DIR)) 
return [];

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const frontmatter = parseFrontmatter(content);

    return {
      slug,
      title: frontmatter.title ?? slug,
      date: frontmatter.date ?? '',
      read: frontmatter.read ?? '',
      category: frontmatter.category ?? '',
    };
  });
}

export function getBlogSource(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) 
return null;

  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatter = parseFrontmatter(content);
  const body = content.replace(/^---[\s\S]*?---/, '').trim();

  return { frontmatter, body };
}

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---([\s\S]*?)---/);
  if (!match) 
return {};

  const lines = match[1].trim().split('\n');
  const result: Record<string, string> = {};

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) 
continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith('\'') && value.endsWith('\''))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}
