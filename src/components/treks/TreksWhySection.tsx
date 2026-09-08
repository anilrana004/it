import { Check } from 'lucide-react';
import { treksWhyCopy, treksWhyNorms } from '@/lib/treks-landing-content';

export default function TreksWhySection() {
  return (
    <section className="it-treks-why" aria-labelledby="it-treks-why-title">
      <div className="it-treks-why__container">
        <div className="it-treks-why__heading">
          <p className="it-treks-why__kicker">{treksWhyCopy.kicker}</p>
          <h2 id="it-treks-why-title">{treksWhyCopy.title}</h2>
          <p>{treksWhyCopy.intro}</p>
        </div>

        <div className="it-treks-why__grid">
          {treksWhyNorms.map((norm) => (
            <article key={norm.title} className="it-treks-why__card">
              <span className="it-treks-why__icon" aria-hidden>
                <Check className="h-4 w-4" />
              </span>
              <h3>{norm.title}</h3>
              <p>{norm.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
