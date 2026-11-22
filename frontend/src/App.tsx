import { useEffect, useMemo, useState } from "react";

type Lesson = { id: string; title: string; duration: string; summary: string; sections: { heading: string; body: string }[]; pending?: boolean };
type Module = { id: string; title: string; level: string; description: string; icon: string; lessons: Lesson[] };

const modules: Module[] = [
  {
    id: "fundamentos", title: "Primeros pasos en LSM", level: "Nivel inicial", description: "Conoce qué es la LSM y cómo acercarte a ella con respeto.", icon: "✦",
    lessons: [
      { id: "que-es-lsm", title: "¿Qué es la LSM?", duration: "5 min", summary: "Una introducción a la Lengua de Señas Mexicana.", sections: [
        { heading: "Una lengua completa", body: "La Lengua de Señas Mexicana (LSM) es una lengua natural de la comunidad sorda en México. Tiene vocabulario, gramática y recursos propios; no es simplemente español representado con las manos." },
        { heading: "Es visual y espacial", body: "La comunicación en LSM utiliza movimientos y configuraciones de las manos, expresiones del rostro, postura y espacio. Estos elementos pueden aportar información lingüística." },
        { heading: "Cada comunidad tiene su lengua", body: "Las lenguas de señas no son universales. La LSM tiene características propias y puede presentar variaciones regionales y comunitarias." }
      ]},
      { id: "respeto-comunidad", title: "Comunidad sorda y respeto", duration: "6 min", summary: "Aprende principios básicos para una interacción respetuosa.", sections: [
        { heading: "Mira a la persona", body: "Cuando una persona sorda se comunica en lengua de señas, procura mantener una atención visual natural y respetar su forma de comunicación." },
        { heading: "Pregunta antes de ayudar", body: "No todas las personas sordas tienen las mismas preferencias. Pregunta cómo puedes comunicarte mejor y no supongas que todas leen los labios o prefieren escribir." },
        { heading: "La comunidad es diversa", body: "Las experiencias, identidades y preferencias son distintas. Escucha a las personas sordas y da prioridad a sus propias decisiones." }
      ]}
    ]
  },
  {
    id: "comunicacion", title: "Comunicación visual", level: "Nivel inicial", description: "Reconoce elementos que acompañan la comunicación visogestual.", icon: "◉",
    lessons: [
      { id: "atencion-visual", title: "Atención y contacto visual", duration: "4 min", summary: "La importancia de compartir la atención.", sections: [
        { heading: "Antes de iniciar", body: "Asegúrate de que la otra persona sepa que quieres comunicarte. Puedes acercarte dentro de su campo visual o llamar su atención de una manera respetuosa." },
        { heading: "Iluminación y espacio", body: "Procura que el rostro y las manos sean visibles, evita colocarte a contraluz y reduce obstáculos visuales cuando sea posible." },
        { heading: "Respeta el ritmo", body: "Mantén una distancia cómoda, permite turnos de conversación y evita interrumpir una interacción en curso." }
      ]},
      { id: "expresion-corporal", title: "Rostro, cuerpo y espacio", duration: "5 min", summary: "Una primera mirada a los componentes no manuales.", sections: [
        { heading: "Más que las manos", body: "En las lenguas de señas, las expresiones faciales y los movimientos del cuerpo pueden tener funciones lingüísticas. No son adornos ni gestos opcionales." },
        { heading: "El espacio comunica", body: "La ubicación y el movimiento en el espacio pueden organizar referentes y relaciones. Su uso debe aprenderse con modelos lingüísticos fiables." },
        { heading: "Aprende con fuentes adecuadas", body: "Observa materiales producidos o revisados por personas sordas competentes en LSM. Evita copiar gestos aislados de fuentes sin contexto." }
      ]}
    ]
  },
  {
    id: "alfabeto", title: "Alfabeto dactilológico", level: "En preparación", description: "Próximamente: material visual revisado para practicar el alfabeto.", icon: "Aa",
    lessons: [
      { id: "alfabeto-intro", title: "Conoce el alfabeto", duration: "Próximamente", summary: "Unidad pendiente de material visual validado.", pending: true, sections: [
        { heading: "Contenido en preparación", body: "Esta unidad se publicará cuando contemos con imágenes o videos de referencia fiables y autorización para utilizarlos. No mostraremos configuraciones de manos generadas o no verificadas." },
        { heading: "Qué incluirá", body: "Una guía visual, recomendaciones de práctica y actividades de reconocimiento, revisadas por personas con conocimiento de LSM." }
      ]}
    ]
  },
  {
    id: "vocabulario", title: "Vocabulario cotidiano", level: "En preparación", description: "Unidades temáticas con vocabulario en contexto y fuentes documentadas.", icon: "⌁",
    lessons: [
      { id: "vocabulario-intro", title: "Palabras de uso cotidiano", duration: "Próximamente", summary: "Contenido en revisión antes de su publicación.", pending: true, sections: [
        { heading: "Aprender en contexto", body: "El vocabulario se presentará con ejemplos y contexto comunicativo, no como una lista de equivalencias palabra por palabra." },
        { heading: "Revisión responsable", body: "Cada recurso deberá identificar su fuente, región cuando corresponda, autorización de uso y revisión por personas competentes en LSM." }
      ]}
    ]
  }
];

const questions = [
  { question: "¿Qué es la Lengua de Señas Mexicana?", answers: ["Español representado con las manos", "Una lengua natural con gramática propia", "Un sistema universal idéntico en todos los países"], correct: 1, explanation: "La LSM es una lengua natural con vocabulario y gramática propios." },
  { question: "¿Las lenguas de señas son universales?", answers: ["Sí, todas son iguales", "No, cada lengua tiene características propias", "Solo cambia el alfabeto"], correct: 1, explanation: "Existen distintas lenguas de señas, vinculadas a comunidades y contextos lingüísticos." },
  { question: "¿Qué puede aportar información lingüística en LSM?", answers: ["Solo las manos", "Las manos, el rostro, el cuerpo y el espacio", "Únicamente la lectura de labios"], correct: 1, explanation: "La comunicación visogestual integra componentes manuales y no manuales." },
  { question: "¿Cuál es una práctica respetuosa al comunicarte?", answers: ["Suponer que todas las personas prefieren lo mismo", "Hablar más fuerte", "Preguntar cómo prefiere comunicarse la persona"], correct: 2, explanation: "Las preferencias son individuales; pregunta y respeta la respuesta." }
];

const STORAGE_KEY = "signari-progress-v1";

function readProgress(): string[] {
  try { const value = localStorage.getItem(STORAGE_KEY); return value ? JSON.parse(value) as string[] : []; }
  catch { return []; }
}

export default function App() {
  const [view, setView] = useState<"home" | "lesson" | "practice">("home");
  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);
  const [activeLessonId, setActiveLessonId] = useState(modules[0].lessons[0].id);
  const [completed, setCompleted] = useState<string[]>(readProgress);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(completed)); } catch { /* El progreso sigue disponible durante esta sesión. */ } }, [completed]);

  const activeModule = modules.find((item) => item.id === activeModuleId) ?? modules[0];
  const activeLesson = activeModule.lessons.find((item) => item.id === activeLessonId) ?? activeModule.lessons[0];
  const allLessons = modules.flatMap((item) => item.lessons);
  const progress = Math.round((completed.length / allLessons.length) * 100);
  const moduleProgress = useMemo(() => Object.fromEntries(modules.map((item) => [item.id, item.lessons.filter((lesson) => completed.includes(lesson.id)).length])), [completed]);

  function openModule(module: Module) {
    setActiveModuleId(module.id);
    setActiveLessonId(module.lessons[0].id);
    setView("home");
    setMobileMenu(false);
  }
  function openLesson(module: Module, lesson: Lesson) {
    setActiveModuleId(module.id);
    setActiveLessonId(lesson.id);
    setView("lesson");
    setMobileMenu(false);
  }
  function markComplete() {
    if (!activeLesson.pending) setCompleted((current) => current.includes(activeLesson.id) ? current : [...current, activeLesson.id]);
  }
  function startPractice() { setAnswers({}); setSubmitted(false); setView("practice"); setMobileMenu(false); }
  const score = questions.filter((item, index) => answers[index] === item.correct).length;

  return (
    <div className="app-layout">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <a className="brand" href="#inicio" onClick={() => setView("home")}><span className="brand-mark">S</span><span>signari</span></a>
        <div className="side-label">APRENDIZAJE</div>
        <button className={`nav-item ${view === "home" ? "active" : ""}`} onClick={() => { setView("home"); setMobileMenu(false); }}><span>⌂</span> Mi aprendizaje</button>
        <button className={`nav-item ${view === "practice" ? "active" : ""}`} onClick={startPractice}><span>✎</span> Practicar</button>
        <div className="side-label modules-label">MÓDULOS</div>
        <div className="module-nav">{modules.map((module) => <button key={module.id} className={`module-nav-item ${activeModuleId === module.id ? "selected" : ""}`} onClick={() => openModule(module)}><span className="module-icon">{module.icon}</span><span className="module-nav-copy">{module.title}<small>{moduleProgress[module.id]}/{module.lessons.length} lecciones</small></span></button>)}</div>
        <div className="sidebar-bottom"><div className="mini-progress"><div className="mini-progress-top"><span>Tu avance</span><strong>{progress}%</strong></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div></div><p>Aprender también es construir comunidad.</p></div>
      </aside>

      <main className="main-area">
        <header className="app-header"><button className="mobile-menu" aria-label="Abrir menú" onClick={() => setMobileMenu(!mobileMenu)}>☰</button><div className="breadcrumb">Signari <span>/</span> {view === "practice" ? "Práctica" : view === "lesson" ? activeModule.title : "Mi aprendizaje"}</div><span className="header-pill">LSM · Nivel inicial</span></header>

        {view === "home" && <div className="content-wrap">
          <section className="welcome-panel"><div><p className="eyebrow">TU ESPACIO DE APRENDIZAJE</p><h1>Aprender nos <span>conecta.</span></h1><p>Avanza a tu ritmo y descubre la riqueza de la Lengua de Señas Mexicana.</p><button className="button-primary" onClick={() => openLesson(activeModule, activeModule.lessons[0])}>Continuar aprendiendo <span>→</span></button></div><div className="welcome-art" aria-hidden="true"><div className="art-circle">🤟</div><span className="spark spark-a">✦</span><span className="spark spark-b">✧</span></div></section>
          <section className="progress-overview"><div><div className="section-kicker">TU PROGRESO</div><h2>Todo gran camino empieza con un paso.</h2><p>Has completado {completed.length} de {allLessons.length} lecciones disponibles.</p></div><div className="progress-ring" style={{ "--progress": `${progress * 3.6}deg` } as React.CSSProperties}><div><strong>{progress}%</strong><small>completado</small></div></div></section>
          <div className="section-heading"><div><div className="section-kicker">RUTA DE APRENDIZAJE</div><h2>Explora los módulos</h2></div><span className="muted-note">{modules.length} módulos</span></div>
          <section className="module-grid">{modules.map((module, index) => { const done = moduleProgress[module.id]; const percent = Math.round(done / module.lessons.length * 100); return <article className="module-card" key={module.id}><div className="module-card-top"><span className="module-card-icon">{module.icon}</span><span className={module.lessons.some((lesson) => lesson.pending) ? "status-tag pending" : "status-tag"}>{module.level}</span></div><div className="module-index">MÓDULO 0{index + 1}</div><h3>{module.title}</h3><p>{module.description}</p><div className="card-progress-line"><span style={{ width: `${percent}%` }} /></div><div className="card-bottom"><span>{done}/{module.lessons.length} lecciones</span><button onClick={() => openModule(module)}>Explorar <span>→</span></button></div></article>; })}</section>
          <section className="practice-banner"><div className="practice-symbol">✎</div><div><strong>¿Listo para repasar?</strong><p>Comprueba lo que has aprendido con una práctica breve.</p></div><button className="button-secondary" onClick={startPractice}>Ir a práctica <span>→</span></button></section>
          <footer className="app-footer">Signari · Proyecto educativo de Lengua de Señas Mexicana <span>Contenido en construcción y revisión continua.</span></footer>
        </div>}

        {view === "lesson" && <div className="content-wrap lesson-wrap"><button className="back-link" onClick={() => setView("home")}>← Volver a módulos</button><div className="lesson-layout"><article className="lesson-main"><div className="section-kicker">{activeModule.title.toUpperCase()}</div><div className="lesson-meta"><span>{activeModule.level}</span><span>·</span><span>{activeLesson.duration}</span></div><h1 className="lesson-title">{activeLesson.title}</h1><p className="lesson-lead">{activeLesson.summary}</p>{activeLesson.pending && <div className="notice-box"><strong>Unidad en preparación</strong><p>Estamos reuniendo material visual con fuentes identificables y revisión especializada. Esta lección no cuenta para tu avance todavía.</p></div>}{activeLesson.sections.map((section, index) => <section className="lesson-section" key={section.heading}><span className="lesson-section-number">0{index + 1}</span><div><h2>{section.heading}</h2><p>{section.body}</p></div></section>)}<div className="lesson-complete">{completed.includes(activeLesson.id) ? <><span className="complete-check">✓</span><div><strong>Lección completada</strong><p>Tu avance quedó guardado en este dispositivo.</p></div></> : <><div><strong>¿Terminaste esta lección?</strong><p>Marca la lección como completada para registrar tu avance.</p></div><button className="button-primary" disabled={activeLesson.pending} onClick={markComplete}>Marcar como completada</button></>}</div></article><aside className="lesson-aside"><div className="aside-card"><div className="section-kicker">EN ESTE MÓDULO</div><h3>{activeModule.title}</h3>{activeModule.lessons.map((lesson, index) => <button key={lesson.id} className={`lesson-list-item ${lesson.id === activeLesson.id ? "current" : ""}`} onClick={() => openLesson(activeModule, lesson)}><span className="lesson-list-number">{completed.includes(lesson.id) ? "✓" : `0${index + 1}`}</span><span>{lesson.title}<small>{lesson.duration}</small></span></button>)}</div><div className="source-note"><strong>Aprendizaje responsable</strong><p>Las unidades con señas y vocabulario visual se publicarán después de verificar sus fuentes y obtener la revisión correspondiente.</p></div></aside></div></div>}

        {view === "practice" && <div className="content-wrap practice-wrap"><button className="back-link" onClick={() => setView("home")}>← Volver a mi aprendizaje</button><div className="practice-heading"><div className="section-kicker">REPASO · NIVEL INICIAL</div><h1>Vamos a practicar.</h1><p>Responde estas preguntas sobre los fundamentos de la LSM.</p></div>{submitted ? <section className="result-card"><div className="result-icon">{score === questions.length ? "✦" : "✓"}</div><div className="section-kicker">RESULTADO DE TU PRÁCTICA</div><h2>{score} de {questions.length} respuestas correctas</h2><p>{score === questions.length ? "¡Excelente! Has comprendido los conceptos principales." : "Buen esfuerzo. Revisa las explicaciones y vuelve a intentarlo cuando quieras."}</p><div className="result-actions"><button className="button-primary" onClick={startPractice}>Intentar de nuevo</button><button className="button-secondary" onClick={() => setView("home")}>Volver al inicio</button></div></section> : <><div className="quiz-progress"><span>{Object.keys(answers).length} de {questions.length} respondidas</span><div className="progress-track"><span style={{ width: `${Object.keys(answers).length / questions.length * 100}%` }} /></div></div><div className="quiz-list">{questions.map((item, index) => <section className="quiz-card" key={item.question}><div className="question-number">PREGUNTA 0{index + 1}</div><h2>{item.question}</h2><div className="answer-list">{item.answers.map((answer, answerIndex) => <button key={answer} className={`answer-option ${answers[index] === answerIndex ? "chosen" : ""}`} onClick={() => setAnswers((current) => ({ ...current, [index]: answerIndex }))}><span className="answer-letter">{String.fromCharCode(65 + answerIndex)}</span>{answer}<span className="answer-radio" /></button>)}</div></section>)}</div><div className="quiz-submit"><span>Podrás revisar las explicaciones al finalizar.</span><button className="button-primary" disabled={Object.keys(answers).length !== questions.length} onClick={() => setSubmitted(true)}>Revisar respuestas <span>→</span></button></div></>}</div>}
      </main>
      {mobileMenu && <button className="mobile-scrim" aria-label="Cerrar menú" onClick={() => setMobileMenu(false)} />}
    </div>
  );
}
