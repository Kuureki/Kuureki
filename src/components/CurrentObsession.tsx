'use client';

import {
  VideoIcon,
  SpeakerLoudIcon,
  MagicWandIcon,
  RocketIcon,
  FileTextIcon,
} from '@radix-ui/react-icons';

interface Obsession {
  type: 'show' | 'album' | 'idea' | 'game' | 'book';
  title: string;
  subtitle?: string;
  note?: string;
  image?: string;
}

interface CurrentObsessionProps {
  obsession: Obsession;
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  show: VideoIcon,
  album: SpeakerLoudIcon,
  idea: MagicWandIcon,
  game: RocketIcon,
  book: FileTextIcon,
};

const typeLabels: Record<string, string> = {
  show: 'Currently watching',
  album: 'Currently listening to',
  idea: 'Currently thinking about',
  game: 'Currently playing',
  book: 'Currently reading',
};

export default function CurrentObsession({ obsession }: CurrentObsessionProps) {
  const Icon = typeIcons[obsession.type] ?? MagicWandIcon;

  return (
    <div className="border-border bg-bg-2 rounded-[10px] border px-[1.6rem] py-[1.6rem]">
      <div className="text-text-dim mb-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
        {typeLabels[obsession.type] ?? 'Current obsession'}
      </div>

      <div className="flex items-start gap-4">
        {obsession.image && (
          <img
            src={obsession.image}
            alt={obsession.title}
            className="h-16 w-16 flex-shrink-0 rounded-md"
          />
        )}
        {!obsession.image && (
          <div className="bg-bg-3 border-border flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md border">
            <Icon className="text-text-dim h-7 w-7" />
          </div>
        )}

        <div className="flex-1">
          <div className="text-text mb-1 text-[1.05rem] font-medium">{obsession.title}</div>
          {obsession.subtitle && (
            <div className="text-text-muted mb-1 text-[0.825rem]">{obsession.subtitle}</div>
          )}
          {obsession.note && (
            <div className="text-text-dim text-[0.75rem] leading-[1.5]">{obsession.note}</div>
          )}
        </div>
      </div>
    </div>
  );
}
