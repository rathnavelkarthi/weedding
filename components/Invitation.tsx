"use client";

import Image from "next/image";
import type { ReactNode } from "react";

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Bala & Gayathri//Wedding Reception//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:bala-gayathri-reception-2026@invite",
    "DTSTAMP:20260521T000000Z",
    "DTSTART;TZID=Asia/Kolkata:20260529T180000",
    "DTEND;TZID=Asia/Kolkata:20260529T223000",
    "SUMMARY:S. Bala & M. Gayathri — Wedding Reception",
    "LOCATION:Manammai Maruthupandiyar Mandapam, Pattaladai, Mannargudi",
    "DESCRIPTION:With immense joy, we invite you to the wedding reception of S. Bala & M. Gayathri on 29 May 2026 at 6:00 PM onwards.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "bala-gayathri-reception.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const MAPS_URL =
  "https://maps.google.com/?q=Manammai+Maruthupandiyar+Mandapam+Pattaladai+Mannargudi";

function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span className="line" />
      <span className="dot" />
      <span className="diamond" />
      <span className="dot" />
      <span className="line" />
    </div>
  );
}

function Portrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="portrait-frame">
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
      <div className="portrait-image">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 720px) 80vw, 320px"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority={false}
        />
      </div>
    </div>
  );
}

export default function Invitation({ cosmosSlot }: { cosmosSlot?: ReactNode }) {
  return (
    <main className="shell">
      {/* HERO */}
      <section className="hero section">
        <div className="rise d1 eyebrow">Wedding Reception · 2026</div>
        <div className="rise d1 om" aria-hidden="true">ॐ</div>
        <div className="rise d2 invite-line">Together with our families</div>

        <h1 className="rise d3 script gold-foil">
          <span className="line-1">Bala</span>
          <span className="amp">&</span>
          <span className="line-2">Gayathri</span>
        </h1>

        <p className="rise d4 tagline">
          Two stories, woven by family and faith,
          <br />
          becoming one beneath an evening of gold.
        </p>

        <Ornament />

        <div className="rise d5 date-pill">
          <span>29 May 2026</span>
          <span className="bullet" />
          <span>Friday</span>
          <span className="bullet" />
          <span>6:00 PM</span>
        </div>

        <div className="scroll-cue rise d6">Scroll</div>
      </section>

      {/* COUPLE */}
      <section className="section couple-section">
        <div className="couple-intro">
          <Ornament />
          <h2 className="gold-foil section-title">The Two of Us</h2>
          <p className="section-lede">
            From distant beginnings, our paths quietly turned toward one another —
            guided by the blessings of those who came before us.
          </p>
        </div>

        <article className="persona">
          <div className="role">The Groom</div>
          <Portrait src="/images/photo-01.jpg" alt="S. Bala" />
          <h3 className="script gold-foil name">Bala</h3>
          <div className="full-name">Mr. S. Bala · M.E.</div>
          <div className="lineage">
            <span className="label">Son of</span>
            <span>Mr. S. Sundaram &amp; Mrs. S. Kanagavalli</span>
            <span className="city">Thiruvarur</span>
          </div>
        </article>

        <div className="joining">
          <span className="symbol script">&</span>
          <span className="caption">Joined in Marriage</span>
        </div>

        <article className="persona">
          <div className="role">The Bride</div>
          <Portrait src="/images/photo-02.jpg" alt="M. Gayathri" />
          <h3 className="script gold-foil name">Gayathri</h3>
          <div className="full-name">Ms. M. Gayathri · GNM</div>
          <div className="lineage">
            <span className="label">Daughter of</span>
            <span>Mr. M. Thandavarayan &amp; Mrs. S. Meenakshi</span>
            <span className="city">Mannargudi</span>
          </div>
        </article>
      </section>

      {/* COSMOS 3D GALLERY */}
      {cosmosSlot && (
        <section className="cosmos-section" aria-label="3D Photo Cosmos">
          {cosmosSlot}
        </section>
      )}

      {/* CARD */}
      <section className="section">
        <div className="invitation-card">
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />

          <div className="om-large" aria-hidden="true">ॐ</div>
          <div className="salutation">With Joy &amp; Gratitude</div>

          <p className="blessing">
            <em>
              &ldquo;Where there is love, there is life. Where there are families, there are
              blessings without measure.&rdquo;
            </em>
          </p>

          <div className="names script gold-foil">
            <span>Bala</span>
            <span className="amp">&</span>
            <span>Gayathri</span>
          </div>

          <p className="request">
            request the honour of your gracious presence
            <br />
            at their Wedding Reception
          </p>

          <div className="details-grid">
            <div className="detail-card">
              <div className="eyebrow">The Date</div>
              <div className="big gold-foil">29</div>
              <div className="meta">May · 2026</div>
              <div className="sub">Friday Evening</div>
            </div>
            <div className="detail-card">
              <div className="eyebrow">The Hour</div>
              <div className="big gold-foil">6:00</div>
              <div className="meta">P · M · Onwards</div>
              <div className="sub">Dinner to follow</div>
            </div>
          </div>

          <div className="venue">
            <div className="eyebrow">The Venue</div>
            <div className="name">Manammai Maruthupandiyar Mandapam</div>
            <div className="address">
              Pattaladai, Mannargudi
              <br />
              Thiruvarur District · Tamil Nadu
            </div>
            <div className="actions">
              <a className="btn solid" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                Open in Maps
              </a>
              <button className="btn" onClick={downloadIcs}>
                Save the Date
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <Ornament />
        <p className="families">
          With the loving blessings of
          <br />
          <strong>Sundaram &amp; Kanagavalli</strong>
          <br />
          and
          <br />
          <strong>Thandavarayan &amp; Meenakshi</strong>
        </p>
        <div className="signoff script gold-foil">With love,</div>
        <div className="meta-bottom">Bala &amp; Gayathri · Mannargudi · 2026</div>
      </footer>
    </main>
  );
}
