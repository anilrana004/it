import type { RichBlock, TrekRichSection } from '@/lib/treks/trek-extended-types';

export function RichBlocks({ blocks }: { blocks: RichBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'h3') {
          return <h3 key={`${block.text}-${index}`}>{block.text}</h3>;
        }
        if (block.type === 'ul') {
          return (
            <ul key={`ul-${index}`}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={`${block.text.slice(0, 24)}-${index}`}>{block.text}</p>;
      })}
    </>
  );
}

const SECTION_ICONS: Record<string, string> = {
  fitness: 'fa-solid fa-dumbbell',
  safety: 'fa-solid fa-shield-heart',
  food: 'fa-solid fa-utensils',
  'why-choose': 'fa-solid fa-award',
};

export function TrekRichSectionCard({ section }: { section: TrekRichSection }) {
  const icon = SECTION_ICONS[section.id] ?? 'fa-regular fa-file-lines';
  return (
    <section id={section.id} className="kg-section">
      <div className="kg-overview-card">
        <div className="kg-overview-head">
          <div>
            <span className="kg-overview-kicker">
              <i className={icon} aria-hidden /> {section.kicker}
            </span>
            <h2>{section.title}</h2>
            {section.intro ? <p>{section.intro}</p> : null}
          </div>
        </div>
        <div className="kg-overview-text kg-extended-rich">
          <RichBlocks blocks={section.blocks} />
        </div>
      </div>
    </section>
  );
}

export function TrekExtendedNavItems(sections: TrekRichSection[]) {
  const labels: Record<string, string> = {
    fitness: 'Fitness',
    safety: 'Safety',
    food: 'Food',
    'why-choose': 'Why Choose',
  };
  return sections.map((section) => ({
    id: section.id,
    label: labels[section.id] ?? section.title,
    icon: SECTION_ICONS[section.id] ?? 'fa-regular fa-file-lines',
  }));
}
