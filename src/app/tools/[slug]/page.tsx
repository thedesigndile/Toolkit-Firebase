import { ToolPageClient } from './client-component';
import { ProgressProvider } from '@/components/progress-provider';
import { tools } from '@/lib/tools';

export async function generateStaticParams() {
  const slugs = tools.map(tool => ({
    slug: tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')
  }));

  return slugs;
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return (
    <ProgressProvider>
      <ToolPageClient params={resolvedParams} />
    </ProgressProvider>
  );
}