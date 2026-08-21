import Link from 'next/link';
import { whatsappUrl } from '@/lib/contact';

/**
 * UI/UX mirrored from https://roopkundheaven.in/about-us/ — “About Roopkund Heaven”:
 * two-column media + copy, kicker, accent title, lead + body, highlight bar,
 * 2×2 feature cards, region badges, Contact / WhatsApp + trust note.
 */
export default function AboutBrand() {
  return (
    <section className="it-about-section" id="about-indian-treks" aria-labelledby="it-about-title">
      <style>{`
        .it-about-section{
          --it-primary:#16a34a;
          --it-primary-dark:#15803d;
          --it-primary-soft:#f0fdf4;
          --it-primary-mid:#4ade80;
          --it-text:#141414;
          --it-text-soft:#5f5f5f;
          --it-text-light:#7a7a7a;
          --it-border:rgba(22,163,74,.14);
          --it-wrap:1180px;
          --it-white:#fff;

          padding:46px 0;
          color:var(--it-text);
          overflow:hidden;
        }

        .it-about-section *{ box-sizing:border-box; }

        .it-about-wrap{
          width:min(var(--it-wrap), calc(100% - 34px));
          margin:0 auto;
        }

        .it-about-grid{
          display:grid;
          grid-template-columns:.92fr 1.08fr;
          gap:22px;
          align-items:center;
        }

        .it-about-media-box{
          overflow:hidden;
          min-height:500px;
        }

        .it-about-media-box img{
          width:100%;
          height:100%;
          display:block;
          border-radius:20px;
          object-fit:cover;
          object-position:center;
        }

        .it-about-kicker{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:8px 12px;
          border-radius:999px;
          background:#fff;
          border:1px solid var(--it-border);
          color:var(--it-primary);
          font-size:11.5px;
          font-weight:800;
          letter-spacing:.08em;
          text-transform:uppercase;
          margin-bottom:12px;
          box-shadow:0 8px 18px rgba(22,163,74,.08);
        }

        .it-about-title{
          margin:0 0 10px;
          font-size:38px;
          line-height:1.02;
          letter-spacing:-1.2px;
          font-weight:900;
          color:var(--it-text);
          font-family:var(--font-heading), ui-sans-serif, system-ui, sans-serif;
        }

        .it-about-title .accent{
          color:var(--it-primary);
        }

        .it-about-lead{
          margin:0 0 12px;
          font-size:14.5px;
          line-height:1.75;
          color:#000;
          font-weight:500;
        }

        .it-about-copy{
          display:grid;
          gap:9px;
          margin-bottom:14px;
        }

        .it-about-copy p{
          margin:0;
          font-size:13.5px;
          line-height:1.72;
          color:#000;
          font-weight:400;
        }

        .it-about-highlight{
          margin:0 0 14px;
          padding:13px 14px 13px 16px;
          border-radius:16px;
          background:linear-gradient(180deg, rgba(255,255,255,.96), rgba(240,253,244,.96));
          border:1px solid var(--it-border);
          box-shadow:0 10px 20px rgba(22,163,74,.06);
          position:relative;
        }

        .it-about-highlight:before{
          content:"";
          position:absolute;
          left:0;
          top:12px;
          bottom:12px;
          width:4px;
          border-radius:999px;
          background:linear-gradient(180deg, var(--it-primary), var(--it-primary-mid));
        }

        .it-about-highlight p{
          margin:0;
          padding-left:10px;
          font-size:13px;
          line-height:1.7;
          color:var(--it-text);
          font-weight:600;
        }

        .it-about-cards{
          display:grid;
          grid-template-columns:repeat(2, minmax(0,1fr));
          gap:10px;
          margin-bottom:14px;
        }

        .it-about-card{
          padding:12px;
          border-radius:16px;
          background:rgba(255,255,255,.92);
          border:1px solid var(--it-border);
          box-shadow:0 8px 18px rgba(20,20,20,.04);
          display:flex;
          gap:10px;
          align-items:flex-start;
        }

        .it-about-card-icon{
          width:38px;
          height:38px;
          min-width:38px;
          border-radius:12px;
          display:flex;
          align-items:center;
          justify-content:center;
          color:var(--it-primary);
          background:linear-gradient(180deg, #fff, var(--it-primary-soft));
          border:1px solid var(--it-border);
          font-size:14px;
        }

        .it-about-card-text strong{
          display:block;
          margin:1px 0 3px;
          font-size:13.5px;
          line-height:1.3;
          font-weight:800;
          color:var(--it-text);
        }

        .it-about-card-text span{
          display:block;
          font-size:12.2px;
          line-height:1.55;
          color:#000;
          font-weight:500;
        }

        .it-about-badges{
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          margin-bottom:15px;
        }

        .it-about-badges span{
          display:inline-flex;
          align-items:center;
          gap:7px;
          padding:8px 11px;
          border-radius:999px;
          background:#fff;
          border:1px solid var(--it-border);
          color:var(--it-text);
          font-size:11.5px;
          line-height:1;
          font-weight:800;
        }

        .it-about-badges i{
          color:var(--it-primary);
          font-size:11px;
        }

        .it-about-bottom{
          display:flex;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;
        }

        .it-about-btn{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:8px;
          min-height:42px;
          padding:0 15px;
          border-radius:13px;
          text-decoration:none;
          font-size:12.8px;
          font-weight:800;
          transition:.22s ease;
        }

        .it-about-btn-primary{
          background:linear-gradient(135deg, var(--it-primary), var(--it-primary-dark));
          color:#fff;
          box-shadow:0 12px 24px rgba(22,163,74,.18);
        }

        .it-about-btn-light{
          background:#fff;
          color:var(--it-text);
          border:1px solid var(--it-border);
        }

        .it-about-btn:hover{
          transform:translateY(-2px);
        }

        .it-about-note{
          display:flex;
          align-items:center;
          gap:8px;
          color:var(--it-text-light);
          font-size:12px;
          font-weight:700;
        }

        .it-about-note i{
          color:var(--it-primary);
        }

        @media (max-width: 1100px){
          .it-about-title{ font-size:34px; }
          .it-about-grid{ gap:18px; }
          .it-about-media-box{ min-height:460px; }
        }

        @media (max-width: 980px){
          .it-about-grid{
            grid-template-columns:1fr;
            gap:16px;
          }
          .it-about-media{ order: -1; }
          .it-about-media-box{
            min-height:auto;
            max-height:none;
            border-radius:16px;
          }
          .it-about-media-box img{
            min-height:200px;
            max-height:240px;
            border-radius:16px;
          }
          .it-about-title{ max-width:none; }
        }

        @media (max-width: 640px){
          .it-about-section{ padding:28px 0 20px; }
          .it-about-wrap{ width:min(var(--it-wrap), calc(100% - 24px)); }
          .it-about-title{ font-size:26px; line-height:1.12; letter-spacing:-0.6px; }
          .it-about-lead{ font-size:13.5px; line-height:1.65; margin-bottom:10px; }
          .it-about-copy{ gap:8px; margin-bottom:12px; }
          .it-about-copy p{ font-size:13px; line-height:1.65; }
          .it-about-highlight{ margin-bottom:12px; padding:12px; border-radius:14px; }
          .it-about-highlight p{ font-size:12.5px; line-height:1.6; }
          .it-about-cards{ grid-template-columns:1fr; gap:8px; margin-bottom:12px; }
          .it-about-card{ padding:12px; border-radius:14px; }
          .it-about-badges{ gap:6px; margin-bottom:14px; }
          .it-about-badges span{ font-size:11px; padding:7px 10px; }
          .it-about-bottom{ flex-direction:column; align-items:stretch; gap:8px; }
          .it-about-btn{ width:100%; min-height:44px; }
          .it-about-note{ justify-content:center; text-align:center; font-size:11.5px; }
        }
      `}</style>

      <div className="it-about-wrap">
        <div className="it-about-grid">
          <div className="it-about-media">
            <div className="it-about-media-box">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1100&fit=crop"
                alt="About Indian Treks — Himalayan trails"
              />
            </div>
          </div>

          <div className="it-about-content">
            <div className="it-about-kicker">About Indian Treks</div>

            <h2 className="it-about-title" id="it-about-title">
              India&apos;s Most Trusted Trekking Company{' '}
              <span className="accent">Since 2016</span>
            </h2>

            <p className="it-about-lead">
              Indian Treks is among India&apos;s most experienced and trusted trekking and adventure
              organizations, officially founded in 2016 and based in Dehradun, Uttarakhand.
            </p>

            <div className="it-about-copy">
              <p>
                The company is led by two brothers, Mr. Vijay Rana and Mr. Vivek Rana, whose lives have
                been deeply rooted in the Himalayas and the adventure industry. Long before Indian Treks
                was established, Mr. Vijay Rana had already been working on the ground in trekking and
                mountaineering since 2005. With over two decades of hands-on Himalayan experience, he
                has led and supported hundreds of treks, expeditions, and outdoor programs across
                Uttarakhand, Himachal Pradesh, and Ladakh.
              </p>
              <p>
                With this vision, the brothers decided to build a company that delivers authentic,
                customized, and responsible Himalayan adventures — and thus, Indian Treks was born.
                Today, Indian Treks organizes 20,000+ trekkers every year, offering 200+ trekking routes
                and 12+ high-altitude expeditions, along with camping, rafting, mountaineering and
                customized itineraries for individuals, groups, schools, and corporates.
              </p>
            </div>

            <div className="it-about-highlight">
              <p>
                Born and raised in a remote Himalayan village, the founders understand the real
                challenges faced by mountain communities. This connection shaped Indian Treks into an
                organization that is vocal for locals and deeply committed to sustainable tourism.
              </p>
            </div>

            <div className="it-about-cards">
              <div className="it-about-card">
                <div className="it-about-card-icon" aria-hidden>
                  <i className="fa-solid fa-user-shield" />
                </div>
                <div className="it-about-card-text">
                  <strong>Expert Team</strong>
                  <span>50+ mountain specialists and 20+ qualified guides under one roof.</span>
                </div>
              </div>

              <div className="it-about-card">
                <div className="it-about-card-icon" aria-hidden>
                  <i className="fa-solid fa-route" />
                </div>
                <div className="it-about-card-text">
                  <strong>200+ Routes</strong>
                  <span>Trekking routes plus 12+ high-altitude expeditions across the Himalayas.</span>
                </div>
              </div>

              <div className="it-about-card">
                <div className="it-about-card-icon" aria-hidden>
                  <i className="fa-solid fa-mountain" />
                </div>
                <div className="it-about-card-text">
                  <strong>Since 2016</strong>
                  <span>Founded in Dehradun with roots in Himalayan mountain operations since 2005.</span>
                </div>
              </div>

              <div className="it-about-card">
                <div className="it-about-card-icon" aria-hidden>
                  <i className="fa-solid fa-award" />
                </div>
                <div className="it-about-card-text">
                  <strong>Authorized Operator</strong>
                  <span>Recognized by Ministry of Tourism, UTDB, MSME and ISO 9001:2015.</span>
                </div>
              </div>
            </div>

            <div className="it-about-badges">
              <span>
                <i className="fa-solid fa-check" aria-hidden /> Uttarakhand
              </span>
              <span>
                <i className="fa-solid fa-check" aria-hidden /> Himachal
              </span>
              <span>
                <i className="fa-solid fa-check" aria-hidden /> Ladakh
              </span>
              <span>
                <i className="fa-solid fa-check" aria-hidden /> Peak Expeditions
              </span>
            </div>

            <div className="it-about-bottom">
              <Link href="/contact" className="it-about-btn it-about-btn-primary">
                <i className="fa-regular fa-paper-plane" aria-hidden />
                Contact Us
              </Link>

              <a
                href={whatsappUrl('Hi Indian Treks! I want to know more about your treks.')}
                className="it-about-btn it-about-btn-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden />
                WhatsApp
              </a>

              <div className="it-about-note">
                <i className="fa-solid fa-circle-check" aria-hidden />
                India&apos;s most trusted trekking community since 2016
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
