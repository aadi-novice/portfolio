import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanityClient';
import { echoesTitle } from '../lib/content';

// ─── Custom Block Components ─────────────────────────────────────────────────

const CodeBlockComponent = ({ value }: any) => (
  <figure>
    <figcaption className="caption" style={{ marginTop: 0, marginBottom: 'var(--space-xs)' }}>
      {value.filename || 'code'}.{value.language || 'ts'}
    </figcaption>
    <pre><code>{value.code}</code></pre>
  </figure>
);

const ImageBlockComponent = ({ value }: any) => {
  const imageUrl = value.image?.asset
    ? urlFor(value.image).width(1600).url()
    : null;
  return (
    <figure>
      {imageUrl && (
        <div className="photo photo--wide">
          <img src={imageUrl} alt={value.altText || value.caption || ''} loading="lazy" width={1600} height={900} />
        </div>
      )}
      {(value.label || value.caption) && (
        <figcaption className="caption">
          {[value.label, value.caption].filter(Boolean).join(': ')}
        </figcaption>
      )}
    </figure>
  );
};

const MetricsBlockComponent = ({ value }: any) => (
  <div className="figures" role="group" aria-label="Impact metrics">
    {value.metrics?.map((m: any, i: number) => (
      <div key={i}>
        <b>{m.value}</b>
        <span className="meta">{m.label}</span>
      </div>
    ))}
  </div>
);

const ChallengeBlockComponent = ({ value }: any) => (
  <div className="aside">
    <h3>{value.title}</h3>
    <p>{value.description}</p>
  </div>
);

const CalloutBlockComponent = ({ value }: any) => (
  <blockquote className="pull">
    <p>“{value.quote}”</p>
    {value.attribution && <cite>{value.attribution}</cite>}
  </blockquote>
);

const TechSpecBlockComponent = ({ value }: any) => (
  <table>
    <caption className="visually-hidden">Technical specification</caption>
    <tbody>
      {value.specs?.map((spec: any, i: number) => (
        <tr key={i}>
          <th scope="row">{spec.label}</th>
          <td>{spec.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// ─── Standard text block components ─────────────────────────────────────────

const components = {
  block: {
    normal: ({ children }: any) => <p>{children}</p>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    h3: ({ children }: any) => <h3>{children}</h3>,
    blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    code: ({ children }: any) => <code>{children}</code>,
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
  /** The page's own title; a body that opens by repeating it skips that heading. */
  title?: string;
}

export default function PortableTextRenderer({ value, title = '' }: PortableTextRendererProps) {
  if (!value || !value.length) return null;
  const blocks = echoesTitle(value[0], title) ? value.slice(1) : value;
  return (
    <div className="portable-text-body prose">
      <PortableText value={blocks} components={components} />
    </div>
  );
}
