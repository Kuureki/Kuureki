'use client';

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

const typeIcons: Record<string, string> = {
  show: 'M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z',
  album: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
  idea: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z',
  game: 'M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  book: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z',
};

const typeLabels: Record<string, string> = {
  show: 'Currently watching',
  album: 'Currently listening to',
  idea: 'Currently thinking about',
  game: 'Currently playing',
  book: 'Currently reading',
};

export default function CurrentObsession({ obsession }: CurrentObsessionProps) {
  return (
    <div className="border-border rounded-[10px] border bg-bg-2 px-[1.6rem] py-[1.6rem]">
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
            <svg viewBox="0 0 24 24" className="text-text-dim h-7 w-7 fill-current">
              <path d={typeIcons[obsession.type] ?? typeIcons.idea} />
            </svg>
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
