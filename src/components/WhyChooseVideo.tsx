/**
 * Featured film for Why Choose Indian Treks — click-to-play with Uiverse CTA.
 */
import YouTubeLazyPlayer from '@/components/ui/YouTubeLazyPlayer';

const YOUTUBE_ID = 'G7a_tPbcELY';
const VIDEO_TITLE = 'Himalayas India cinematic travel film — Indian Treks';

export default function WhyChooseVideo({ className = '' }: { className?: string }) {
  return (
    <div className={['it-whyvid', className].filter(Boolean).join(' ')}>
      <style>{`
        .it-whyvid {
          position: relative;
          isolation: isolate;
          margin-top: 28px;
        }

        .it-whyvid.it-whyvid--flush {
          margin-top: 0;
        }

        .it-whyvid.it-whyvid--plain .it-whyvid__bloom {
          display: none;
        }

        .it-whyvid.it-whyvid--plain .it-whyvid__ring {
          padding: 0;
          background: transparent;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);
        }

        .it-whyvid.it-whyvid--plain .it-whyvid__stage {
          border-radius: 16px;
          background: #0f172a;
          box-shadow: none;
        }

        .it-whyvid__bloom {
          position: absolute;
          inset: -14% 0 -18%;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: 40px;
        }

        .it-whyvid__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(48px);
        }

        .it-whyvid__orb--a {
          width: 58%;
          height: 72%;
          left: -8%;
          top: 8%;
          background: rgba(22, 163, 74, 0.32);
        }

        .it-whyvid__orb--b {
          width: 52%;
          height: 68%;
          right: -10%;
          top: -8%;
          background: rgba(74, 222, 128, 0.38);
        }

        .it-whyvid__orb--c {
          width: 40%;
          height: 36%;
          left: 30%;
          bottom: -12%;
          background: rgba(134, 239, 172, 0.28);
        }

        .it-whyvid__ring {
          position: relative;
          z-index: 1;
          border-radius: 22px;
          padding: 2.5px;
          background: linear-gradient(
            135deg,
            #86efac 0%,
            #4ade80 18%,
            #16a34a 48%,
            #15803d 76%,
            #4ade80 100%
          );
          box-shadow:
            0 0 0 1px rgba(22, 163, 74, 0.16),
            0 10px 28px rgba(22, 163, 74, 0.18),
            0 28px 64px rgba(22, 163, 74, 0.2);
        }

        .it-whyvid__stage {
          position: relative;
          aspect-ratio: 16 / 9;
          border-radius: 19.5px;
          overflow: hidden;
          background: #06210f;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
        }

        @media (max-width: 640px) {
          .it-whyvid { margin-top: 22px; }
          .it-whyvid.it-whyvid--flush { margin-top: 0; }
          .it-whyvid__bloom { inset: -8% 0 -12%; }
          .it-whyvid__orb { filter: blur(32px); }
          .it-whyvid__ring { border-radius: 14px; padding: 2px; }
          .it-whyvid__stage { border-radius: 12px; }
          .it-whyvid.it-whyvid--plain .it-whyvid__ring,
          .it-whyvid.it-whyvid--plain .it-whyvid__stage {
            border-radius: 12px;
          }
        }
      `}</style>

      <div className="it-whyvid__bloom" aria-hidden>
        <span className="it-whyvid__orb it-whyvid__orb--a" />
        <span className="it-whyvid__orb it-whyvid__orb--b" />
        <span className="it-whyvid__orb it-whyvid__orb--c" />
      </div>

      <div className="it-whyvid__ring">
        <div className="it-whyvid__stage">
          <YouTubeLazyPlayer youtubeId={YOUTUBE_ID} title={VIDEO_TITLE} />
        </div>
      </div>
    </div>
  );
}
