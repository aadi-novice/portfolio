import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanityClient';

// ─── Custom Block Components ─────────────────────────────────────────────────

const CodeBlockComponent = ({ value }: any) => (
  <div className="bg-surface-container-lowest p-8 overflow-x-auto border-l-4 border-primary-fixed font-mono text-sm leading-relaxed my-8">
    <div className="flex justify-between mb-4 border-b border-white/10 pb-2">
      <span className="text-white/40 uppercase text-[10px] font-label">{value.filename || 'code'}.{value.language || 'ts'}</span>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
      </div>
    </div>
    <pre className="text-white/90 whitespace-pre-wrap">{value.code}</pre>
  </div>
);

const ImageBlockComponent = ({ value }: any) => {
  const imageUrl = value.image?.asset
    ? urlFor(value.image).width(1200).url()
    : null;
  return (
    <div className="my-12 relative group">
      {value.label && (
        <div className="absolute -top-4 -left-4 bg-secondary-container text-on-secondary px-4 py-1 font-label text-xs font-bold uppercase z-10">
          {value.label}
        </div>
      )}
      <div className="overflow-hidden bg-black aspect-video relative border-4 border-white/5">
        {imageUrl && (
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={value.altText || value.caption || ''}
          />
        )}
      </div>
      {value.caption && (
        <p className="font-label text-xs text-white/40 uppercase tracking-widest mt-3">{value.caption}</p>
      )}
    </div>
  );
};

const MetricsBlockComponent = ({ value }: any) => (
  <div className="my-16 bg-primary-container p-12 flex flex-col gap-8">
    <h3 className="font-headline text-4xl font-black uppercase text-on-primary-fixed leading-none tracking-tighter">
      IMPACT_METRICS
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {value.metrics?.map((m: any, i: number) => (
        <div
          key={i}
          className={`p-6 flex flex-col ${
            m.color === 'secondary'
              ? 'bg-secondary-container text-on-secondary-container'
              : 'bg-on-primary-fixed text-primary-container'
          }`}
        >
          <span className="font-headline text-5xl font-black">{m.value}</span>
          <span className="font-label text-[10px] uppercase tracking-widest mt-1">{m.label}</span>
        </div>
      ))}
    </div>
  </div>
);

const ChallengeBlockComponent = ({ value }: any) => (
  <div
    className={`p-8 flex flex-col justify-between my-6 ${
      value.theme === 'light'
        ? 'bg-white'
        : 'bg-surface-container-high border-b-8 border-secondary-container'
    }`}
  >
    <span className={`material-symbols-outlined mb-4 text-3xl ${value.theme === 'light' ? 'text-black' : 'text-secondary-container'}`}>
      bolt
    </span>
    <h4 className={`font-headline text-2xl font-bold uppercase mb-3 ${value.theme === 'light' ? 'text-black' : 'text-white'}`}>
      {value.title}
    </h4>
    <p className={`font-body ${value.theme === 'light' ? 'text-black/80' : 'text-on-surface/70'}`}>
      {value.description}
    </p>
  </div>
);

const CalloutBlockComponent = ({ value }: any) => (
  <div className="my-12 bg-surface-container-highest p-12 border-l-[12px] border-primary-fixed relative">
    <span
      className="material-symbols-outlined text-6xl text-primary-fixed/20 absolute top-4 right-8 select-none"
      style={{ fontVariationSettings: "'FILL' 1" }}
    >
      format_quote
    </span>
    <p className="text-3xl font-headline font-bold italic leading-tight text-white mb-4">
      "{value.quote}"
    </p>
    {value.attribution && (
      <cite className="font-label text-sm uppercase tracking-[0.3em] text-secondary">
        {value.attribution}
      </cite>
    )}
  </div>
);

const TechSpecBlockComponent = ({ value }: any) => (
  <div className="my-8 border-t-4 border-primary-container pt-6">
    <h3 className="font-headline text-2xl font-black uppercase mb-4 text-white">TECH_SPEC</h3>
    <ul className="space-y-3">
      {value.specs?.map((spec: any, i: number) => (
        <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="font-label text-xs text-white/50 tracking-widest uppercase">{spec.label}</span>
          <span className="font-label text-xs text-primary-container font-bold">{spec.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

// ─── Standard text block components ─────────────────────────────────────────

const components = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg leading-relaxed font-body text-on-surface/80 mb-6">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-headline text-4xl font-black uppercase tracking-tighter text-primary-fixed my-8">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-headline text-2xl font-bold uppercase text-white my-6">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-secondary pl-6 italic text-xl text-white/70 my-8">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <span className="font-bold text-white">{children}</span>,
    em: ({ children }: any) => <em className="italic text-secondary">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-surface-container-highest text-primary-fixed px-2 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
  },
  types: {
    codeBlock: CodeBlockComponent,
    imageBlock: ImageBlockComponent,
    metricsBlock: MetricsBlockComponent,
    challengeBlock: ChallengeBlockComponent,
    calloutBlock: CalloutBlockComponent,
    techSpecBlock: TechSpecBlockComponent,
  },
};

interface PortableTextRendererProps {
  value: any[];
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || !value.length) return null;
  return (
    <div className="portable-text-body">
      <PortableText value={value} components={components} />
    </div>
  );
}
