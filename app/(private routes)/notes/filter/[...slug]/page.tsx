import NotesClient from './Notes.client';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `Note Flow | ${tag}`,
    description: `Viewing ${tag} notes in Note Flow`,
    openGraph: {
      title: `Note Flow | ${tag}`,
      description: `Viewing ${tag} notes in Note Flow`,
      url: `/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug[0];

  return <NotesClient tag={tag} />;
}