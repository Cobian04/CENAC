"use client";

import { type MouseEvent, useEffect, useState } from "react";

type Lang = "es" | "en";

const copy = {
  es: {
    nav: [
      ["quienes-somos", "Quienes somos"],
      ["clases-cursos", "Clases y cursos"],
      ["donaciones", "Donaciones"],
    ],
    langButton: "Idioma",
    darkButton: "Modo oscuro",
    lightButton: "Modo claro",
    title: "Arte, comunidad y aprendizaje que despiertan tus sentidos",
    paragraph:
      "CENAC es un espacio vivo para crear, aprender y compartir. Talleres, cursos y experiencias culturales que acercan a niñas, niños, familias y comunidad.",
    scrollHint: "Desliza",
    heroCaption: "Taller comunitario / CENAC",
    marquee: [
      "Clases de computacion",
      "Danza",
      "Pintura",
      "Dibujo",
      "Ingles",
    ],
    sections: {
      aboutTitle: "Quienes somos",
      aboutText:
        "Somos un punto de encuentro donde el arte se vuelve convivencia: pintura, musica, movimiento y actividades que fortalecen la confianza y la imaginacion.",
      aboutKicker: "Centro cultural",
      aboutCaption: "Proceso creativo colectivo",
      coursesTitle: "Clases y cursos",
      coursesText:
        "Abrimos procesos creativos para distintas edades: sesiones practicas, cercanas y cuidadas para explorar habilidades artisticas con acompanamiento.",
      coursesKicker: "Aprendizaje vivo",
      coursesCaption: "Sesion de musica y exploracion",
      donationsTitle: "Donaciones",
      donationsText:
        "Tu apoyo ayuda a sostener materiales, talleres comunitarios y experiencias accesibles para que mas personas puedan participar.",
      donationsKicker: "Comunidad activa",
      donationsCaption: "Materiales y talleres abiertos",
    },
    footer: {
      title: "CENAC",
      text: "Arte, aprendizaje y comunidad en movimiento.",
      contact: "Contacto",
      rights: "Todos los derechos reservados al autor.",
    },
  },
  en: {
    nav: [
      ["quienes-somos", "About"],
      ["clases-cursos", "Classes"],
      ["donaciones", "Donations"],
    ],
    langButton: "Language",
    darkButton: "Dark mode",
    lightButton: "Light mode",
    title: "Art, community and learning that awaken your senses",
    paragraph:
      "CENAC is a living space to create, learn and share. Workshops, courses and cultural experiences for children, families and the wider community.",
    scrollHint: "Scroll",
    heroCaption: "Community workshop / CENAC",
    marquee: [
      "Computer classes",
      "Dance",
      "Painting",
      "Drawing",
      "English",
    ],
    sections: {
      aboutTitle: "About",
      aboutText:
        "We are a meeting point where art becomes connection: painting, music, movement and activities that strengthen confidence and imagination.",
      aboutKicker: "Cultural center",
      aboutCaption: "Collective creative process",
      coursesTitle: "Classes",
      coursesText:
        "We open creative processes for different ages through hands-on, careful sessions that invite people to explore artistic skills with guidance.",
      coursesKicker: "Living learning",
      coursesCaption: "Music and exploration session",
      donationsTitle: "Donations",
      donationsText:
        "Your support helps sustain materials, community workshops and accessible experiences so more people can participate.",
      donationsKicker: "Active community",
      donationsCaption: "Materials and open workshops",
    },
    footer: {
      title: "CENAC",
      text: "Art, learning and community in motion.",
      contact: "Contact",
      rights: "All rights reserved to the author.",
    },
  },
} as const;

const sectionImages = {
  "quienes-somos": {
    src: "/assets/cenac-painting-close.webp",
    alt: "Participantes pintando en un taller creativo de CENAC",
  },
  "clases-cursos": {
    src: "/assets/cenac-music.webp",
    alt: "Clase de musica con guitarras en CENAC",
  },
  donaciones: {
    src: "/assets/cenac-crafts.webp",
    alt: "Taller comunitario con materiales artisticos en CENAC",
  },
} as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>("es");
  const [dark, setDark] = useState(false);
  const t = copy[lang];

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    event.preventDefault();
    event.currentTarget.blur();

    const headerHeight =
      document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = Math.max(
      target.getBoundingClientRect().top + window.scrollY - headerHeight - 18,
      0,
    );

    window.history.pushState(null, "", `#${id}`);
    window.scrollTo({
      top,
      behavior: reducedMotion ? "auto" : "smooth",
    });

    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("scroll"));
    });
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll(".reveal"));
    const imageItems = Array.from(
      document.querySelectorAll<HTMLElement>(".image-reveal"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      imageItems.forEach((item) => {
        item.classList.add("is-visible");
        item.style.setProperty("--image-opacity", "1");
        item.style.setProperty("--image-clip", "0%");
        item.style.setProperty("--image-y", "0px");
        item.style.setProperty("--image-scale", "1");
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
    );

    let ticking = false;

    const updateImageMotion = () => {
      ticking = false;
      const viewportHeight = window.innerHeight || 1;

      imageItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(center - viewportHeight / 2);
        const range = viewportHeight * 0.78;
        const progress = Math.max(0, Math.min(1, 1 - distanceFromCenter / range));
        const visible = rect.bottom > 0 && rect.top < viewportHeight;
        const motion = item.dataset.motion;
        const hidden = 1 - progress;
        const movement = {
          x: 0,
          y: hidden * 72,
          scale: 0.94 + progress * 0.06,
          rotate: 0,
          clip: hidden * 18,
        };

        if (motion === "left") {
          movement.x = hidden * -84;
          movement.y = hidden * 34;
          movement.rotate = hidden * -1.2;
        }

        if (motion === "right") {
          movement.x = hidden * 84;
          movement.y = hidden * 34;
          movement.rotate = hidden * 1.2;
        }

        if (motion === "zoom") {
          movement.y = hidden * 18;
          movement.scale = 0.88 + progress * 0.12;
          movement.rotate = hidden * -0.4;
          movement.clip = hidden * 8;
        }

        item.classList.toggle("is-visible", visible);
        item.style.setProperty("--image-opacity", String(0.08 + progress * 0.92));
        item.style.setProperty("--image-clip", `${movement.clip}%`);
        item.style.setProperty("--image-x", `${movement.x}px`);
        item.style.setProperty("--image-y", `${movement.y}px`);
        item.style.setProperty("--image-scale", String(movement.scale));
        item.style.setProperty("--image-rotate", `${movement.rotate}deg`);
      });
    };

    const requestImageMotion = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateImageMotion);
      }
    };

    revealItems.forEach((item) => revealObserver.observe(item));
    updateImageMotion();
    window.addEventListener("scroll", requestImageMotion, { passive: true });
    window.addEventListener("resize", requestImageMotion);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", requestImageMotion);
      window.removeEventListener("resize", requestImageMotion);
    };
  }, [lang]);

  return (
    <main className="min-h-screen text-[var(--ink)]">
      <header className="site-header">
        <div className="site-header-inner">
          <a
            href="#inicio"
            className="brand-mark"
            aria-label="CENAC"
            onClick={(event) => handleAnchorClick(event, "inicio")}
          >
            CENAC
          </a>

          <nav className="site-nav" aria-label="Navegacion principal">
            {t.nav.map(([id, label]) => (
              <a
                className="nav-link"
                href={`#${id}`}
                key={id}
                onClick={(event) => handleAnchorClick(event, id)}
              >
                {label}
              </a>
            ))}
            <button
              className="nav-action"
              type="button"
              onClick={() => setLang((current) => (current === "es" ? "en" : "es"))}
            >
              {t.langButton}
            </button>
            <button
              className="nav-action"
              type="button"
              aria-pressed={dark}
              onClick={() => setDark((current) => !current)}
            >
              {dark ? t.lightButton : t.darkButton}
            </button>
          </nav>
        </div>
      </header>

      <section id="inicio" className="hero-section">
        <div className="hero-progress" aria-hidden="true">
          <span />
        </div>
        <div className="hero-copy-block reveal">
          <h1>{t.title}</h1>
          <p className="hero-paragraph">{t.paragraph}</p>
        </div>
        <figure className="hero-photo image-reveal motion-rise" data-motion="rise">
          <img
            src="/assets/cenac-hero.webp"
            alt="Ninas, ninos y familias participando en un taller de CENAC"
          />
          <figcaption>{t.heroCaption}</figcaption>
        </figure>
        <p className="scroll-hint">{t.scrollHint}</p>
        <div className="marquee-strip" aria-hidden="true">
          <div>
            {Array.from({ length: 3 }).map((_, groupIndex) =>
              t.marquee.map((item) => (
                <span key={`${groupIndex}-${item}`}>{item}</span>
              )),
            )}
          </div>
        </div>
      </section>

      <section className="section-stack" aria-label="Informacion de CENAC">
        <article id="quienes-somos" className="page-section reveal">
          <div className="section-content">
            <p className="section-kicker">{t.sections.aboutKicker}</p>
            <h2>{t.sections.aboutTitle}</h2>
            <p>{t.sections.aboutText}</p>
          </div>
          <figure className="section-image image-reveal motion-left" data-motion="left">
            <img
              src={sectionImages["quienes-somos"].src}
              alt={sectionImages["quienes-somos"].alt}
            />
            <figcaption>{t.sections.aboutCaption}</figcaption>
          </figure>
        </article>

        <article id="clases-cursos" className="page-section reveal">
          <div className="section-content">
            <p className="section-kicker">{t.sections.coursesKicker}</p>
            <h2>{t.sections.coursesTitle}</h2>
            <p>{t.sections.coursesText}</p>
          </div>
          <figure className="section-image image-reveal motion-right" data-motion="right">
            <img
              src={sectionImages["clases-cursos"].src}
              alt={sectionImages["clases-cursos"].alt}
            />
            <figcaption>{t.sections.coursesCaption}</figcaption>
          </figure>
        </article>

        <article id="donaciones" className="page-section reveal">
          <div className="section-content">
            <p className="section-kicker">{t.sections.donationsKicker}</p>
            <h2>{t.sections.donationsTitle}</h2>
            <p>{t.sections.donationsText}</p>
          </div>
          <figure className="section-image image-reveal motion-zoom" data-motion="zoom">
            <img
              src={sectionImages.donaciones.src}
              alt={sectionImages.donaciones.alt}
            />
            <figcaption>{t.sections.donationsCaption}</figcaption>
          </figure>
        </article>
      </section>

      <footer className="site-footer reveal">
        <div>
          <h2>{t.footer.title}</h2>
          <p>{t.footer.text}</p>
          <small>© 2026 CENAC. {t.footer.rights}</small>
        </div>
        <nav aria-label="Navegacion secundaria">
          {t.nav.map(([id, label]) => (
            <a
              href={`#${id}`}
              key={id}
              onClick={(event) => handleAnchorClick(event, id)}
            >
              {label}
            </a>
          ))}
          <a href="mailto:hola@cenac.org">{t.footer.contact}</a>
        </nav>
      </footer>
    </main>
  );
}
