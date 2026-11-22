export default function App() {
  return (
    <main className="page-shell">
      <nav className="topbar" aria-label="Navegación principal">
        <a className="brand" href="/" aria-label="Signari, inicio">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>signari</span>
        </a>
        <a className="top-link" href="#acerca">Conoce Signari</a>
      </nav>

      <section className="hero" id="acerca">
        <div className="hero-copy">
          <p className="eyebrow">APRENDER NOS CONECTA</p>
          <h1>Una forma más cercana de aprender <span>LSM.</span></h1>
          <p className="intro">
            Estamos construyendo un espacio para aprender Lengua de Señas Mexicana
            paso a paso, con respeto, práctica y contenido confiable.
          </p>
          <a className="primary-link" href="#proyecto">Conocer el proyecto</a>
        </div>
        <div className="sign-card" aria-label="Mensaje de bienvenida">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hands" aria-hidden="true">🤟</div>
          <p>Comunicar también es incluir.</p>
        </div>
      </section>

      <section className="features" id="proyecto">
        <article>
          <span className="feature-number">01</span>
          <h2>Aprende a tu ritmo</h2>
          <p>Lecciones organizadas para avanzar paso a paso.</p>
        </article>
        <article>
          <span className="feature-number">02</span>
          <h2>Practica y progresa</h2>
          <p>Actividades para reforzar lo aprendido y seguir tu avance.</p>
        </article>
        <article>
          <span className="feature-number">03</span>
          <h2>Contenido responsable</h2>
          <p>Material documentado y sujeto a revisión especializada.</p>
        </article>
      </section>

      <footer>Signari · Proyecto educativo de Lengua de Señas Mexicana</footer>
    </main>
  );
}
