import { tools } from '@/lib/tools';

export async function generateStaticParams() {
  const slugs = tools.map(tool => ({
    slug: tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')
  }));

  return slugs;
}