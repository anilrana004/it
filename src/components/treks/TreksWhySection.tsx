import { Check } from 'lucide-react';
import { treksWhyNorms } from '@/lib/treks-landing-content';

export default function TreksWhySection() {
  return (
    <section className="it-treks-why" aria-labelledby="it-treks-why-title">
      <div className="it-treks-why__container">
        <div className="it-treks-why__heading">
          <p className="it-treks-why__kicker">Our standards</p>
          <h2 id="it-treks-why-title">Why Trekkers Love Trekking With Us</h2>
          <p>
            Safety, small groups, clean camps, and leaders who know the Himalayas — the norms behind
            every Indian Treks departure, from weekend trails to high-altitude expeditions.
          </p>
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
