import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { supabase, isSupabaseConfigured } from "./lib/supabase";

type Lesson = { id: string; title: string; duration: string; summary: string; sections: { heading: string; body: string }[]; pending?: boolean };
type Module = { id: string; title: string; level: string; description: string; icon: string; image: string; lessons: Lesson[] };

const modules: Module[] = [
  {
    id: "fundamentos", title: "Primeros pasos en LSM", level: "Nivel inicial", description: "Conoce qué es la LSM y cómo acercarte a ella con respeto.", icon: "✦", image: "https://images.pexels.com/photos/10029301/pexels-photo-10029301.jpeg?auto=compress&cs=tinysrgb&w=600",
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
    id: "comunicacion", title: "Comunicación visual", level: "Nivel inicial", description: "Reconoce elementos que acompañan la comunicación visogestual.", icon: "◉", image: "https://images.pexels.com/photos/9017418/pexels-photo-9017418.jpeg?auto=compress&cs=tinysrgb&w=600",
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
    id: "alfabeto", title: "Alfabeto dactilológico", level: "En preparación", description: "Próximamente: material visual revisado para practicar el alfabeto.", icon: "Aa", image: "https://images.pexels.com/photos/9017383/pexels-photo-9017383.jpeg?auto=compress&cs=tinysrgb&w=600",
    lessons: [
      { id: "alfabeto-intro", title: "Conoce el alfabeto", duration: "Próximamente", summary: "Unidad pendiente de material visual validado.", pending: true, sections: [
        { heading: "Contenido en preparación", body: "Esta unidad se publicará cuando contemos con imágenes o videos de referencia fiables y autorización para utilizarlos. No mostraremos configuraciones de manos generadas o no verificadas." },
        { heading: "Qué incluirá", body: "Una guía visual, recomendaciones de práctica y actividades de reconocimiento, revisadas por personas con conocimiento de LSM." }
      ]}
    ]
  },
  {
    id: "vocabulario", title: "Vocabulario cotidiano", level: "En preparación", description: "Unidades temáticas con vocabulario en contexto y fuentes documentadas.", icon: "⌁", image: "https://images.pexels.com/photos/9017405/pexels-photo-9017405.jpeg?auto=compress&cs=tinysrgb&w=600",
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

function authErrorMessage(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("user already registered")) return "Ya existe una cuenta con este correo. Inicia sesión o recupera tu contraseña.";
  if (normalized.includes("invalid login credentials")) return "El correo o la contraseña son incorrectos.";
  if (normalized.includes("email not confirmed")) return "Primero confirma tu correo desde el enlace que te enviamos.";
  if (normalized.includes("password should be at least")) return "La contraseña no cumple con la longitud mínima requerida.";
  if (normalized.includes("email rate limit exceeded")) return "Se alcanzó el límite temporal de correos. Espera un momento e inténtalo de nuevo.";
  if (normalized.includes("invalid email") || normalized.includes("email address is invalid")) return "Escribe una dirección de correo válida.";
  if (normalized.includes("weak password")) return "Elige una contraseña más segura.";
  return message;
}

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
  const [authUser, setAuthUser] = useState<{ id: string; email?: string } | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authPasswordConfirm, setAuthPasswordConfirm] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [authName, setAuthName] = useState("");
  const [authCompany, setAuthCompany] = useState("");
  const [authAcceptedTerms, setAuthAcceptedTerms] = useState(false);
  const [authRecoveryMode, setAuthRecoveryMode] = useState(false);
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [showAuthPasswordConfirm, setShowAuthPasswordConfirm] = useState(false);
  const [authLegalView, setAuthLegalView] = useState<"terms" | "privacy" | null>(null);
  const [authMessage, setAuthMessage] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [cloudReady, setCloudReady] = useState(false);

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(completed)); } catch { /* El progreso sigue disponible durante esta sesión. */ } }, [completed]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => { setAuthUser(data.session?.user ? { id: data.session.user.id, email: data.session.user.email } : null); setAuthChecked(true); }).catch(() => setAuthChecked(true));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
      setCloudReady(false);
      setAuthMessage("");
      setAuthChecked(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !authUser) { setCloudReady(false); return; }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.from("lesson_progress").select("lesson_id").eq("user_id", authUser.id);
      if (cancelled) return;
      if (error) { setAuthMessage("No se pudo cargar el progreso en la nube. Tu avance local se conserva."); setCloudReady(true); return; }
      const cloudIds = (data ?? []).map((row) => row.lesson_id);
      setCompleted((current) => Array.from(new Set([...current, ...cloudIds])));
      setCloudReady(true);
    })();
    return () => { cancelled = true; };
  }, [authUser?.id]);

  useEffect(() => {
    if (!supabase || !authUser || !cloudReady || completed.length === 0) return;
    const rows = completed.map((lesson_id) => ({ user_id: authUser.id, lesson_id }));
    supabase.from("lesson_progress").upsert(rows, { onConflict: "user_id,lesson_id" })
      .then(({ error }) => { if (error) setAuthMessage("No se pudo sincronizar el progreso. Se mantiene guardado en este dispositivo."); });
  }, [completed, authUser?.id, cloudReady]);

  async function submitAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) { setAuthMessage("La conexión de cuentas no está disponible en este momento."); return; }
    if ((authMode === "register" || authRecoveryMode) && authPassword !== authPasswordConfirm) { setAuthMessage("Las contraseñas no coinciden."); return; }
    if (authMode === "register" && !authAcceptedTerms) { setAuthMessage("Debes aceptar los Términos de Servicio y la Política de Privacidad."); return; }
    setAuthBusy(true); setAuthMessage("");
    if (authRecoveryMode) {
      const { error } = await supabase.auth.updateUser({ password: authPassword });
      setAuthBusy(false);
      if (error) { setAuthMessage(authErrorMessage(error.message)); return; }
      setAuthRecoveryMode(false);
      setAuthPassword(""); setAuthPasswordConfirm("");
      setAuthMessage("Tu contraseña se actualizó correctamente. Ya puedes continuar en Signari.");
      return;
    }
    const result = authMode === "register"
      ? await supabase.auth.signUp({ email: authEmail.trim(), password: authPassword, options: { data: { display_name: authName.trim(), institution: authCompany.trim(), terms_accepted_at: new Date().toISOString() } } })
      : await supabase.auth.signInWithPassword({ email: authEmail.trim(), password: authPassword });
    setAuthBusy(false);
    if (result.error) { setAuthMessage(authErrorMessage(result.error.message)); return; }
    if (authMode === "register") {
      if (result.data.session?.user) {
        setAuthUser({ id: result.data.session.user.id, email: result.data.session.user.email });
        setAuthMessage("¡Cuenta creada! Entrando a Signari…");
        setAuthPassword("");
        setAuthPasswordConfirm("");
      } else {
        setAuthMessage("Tu cuenta fue creada. Revisa tu correo y confirma tu dirección para poder iniciar sesión. Si no ves el mensaje, revisa la carpeta de spam.");
      }
    } else {
      setAuthMessage("Sesión iniciada. Tu progreso se sincronizará automáticamente.");
    }
  }

  async function signInWithProvider(provider: "google" | "linkedin_oidc") {
    if (!supabase) { setAuthMessage("La conexión de cuentas no está disponible."); return; }
    setAuthBusy(true); setAuthMessage("");
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin, queryParams: provider === "google" ? { prompt: "select_account" } : undefined } });
    if (error) { setAuthBusy(false); setAuthMessage(provider === "google" ? "Google todavía no está conectado en el servicio de cuentas. Puedes registrarte con correo mientras terminamos la configuración." : "LinkedIn todavía no está conectado. Puedes registrarte con correo mientras terminamos la configuración."); }
  }

  async function sendPasswordReset() {
    if (!supabase) { setAuthMessage("La conexión de cuentas no está disponible."); return; }
    if (!authEmail.trim()) { setAuthMessage("Escribe tu correo electrónico para enviarte el enlace de recuperación."); return; }
    setAuthBusy(true); setAuthMessage("");
    const { error } = await supabase.auth.resetPasswordForEmail(authEmail.trim(), { redirectTo: window.location.origin });
    setAuthBusy(false);
    setAuthMessage(error ? error.message : "Si existe una cuenta con ese correo, recibirás un enlace para restablecer tu contraseña.");
  }

  async function signOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    setAuthMessage(error ? error.message : "Sesión cerrada.");
    setAuthUser(null); setCloudReady(false);
  }

  const activeModule = modules.find((item) => item.id === activeModuleId) ?? modules[0];
  const activeLesson = activeModule.lessons.find((item) => item.id === activeLessonId) ?? activeModule.lessons[0];
  const allLessons = modules.flatMap((item) => item.lessons);
  const availableLessons = allLessons.filter((lesson) => !lesson.pending);
  const progress = Math.round((completed.filter((id) => availableLessons.some((lesson) => lesson.id === id)).length / availableLessons.length) * 100);
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

  if (!authChecked) return <main className="auth-loading"><span className="auth-brand-mark">S</span><p>Preparando tu espacio Signari…</p></main>;

  if (!authUser || authRecoveryMode) return (
    <main className="auth-screen">
      <div className="auth-facets" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
      <section className="auth-shell"><div className="auth-card">
        <a className="auth-brand" href="#registro" aria-label="Signari">
          <span className="auth-brand-mark"><svg viewBox="0 0 42 42" aria-hidden="true"><path d="M29.8 9.2c-2.1-2.3-5-3.4-8.7-3.4-6.1 0-10.2 3.2-10.2 8 0 4.3 3.2 6.2 9.6 7.4l2.2.4c4.4.8 6.1 1.8 6.1 4.1 0 2.6-2.5 4.3-6.7 4.3-4 0-7.2-1.5-9.6-4.5" fill="none" stroke="#21c4d0" strokeWidth="5" strokeLinecap="round"/><path d="M12.2 32.8c2.2 2.3 5.1 3.4 8.8 3.4 6.1 0 10.2-3.2 10.2-8 0-4.3-3.2-6.2-9.6-7.4l-2.2-.4c-4.4-.8-6.1-1.8-6.1-4.1 0-2.6 2.5-4.3 6.7-4.3 4 0 7.2 1.5 9.6 4.5" fill="none" stroke="#3988ff" strokeWidth="5" strokeLinecap="round"/></svg></span><span>SIGNARI</span>
        </a>
        <div className="auth-card-intro"><h1>{authRecoveryMode ? "Crea una nueva contraseña" : authMode === "register" ? "Crea tu cuenta en Signari" : "Inicia sesión en Signari"}</h1><p>{authRecoveryMode ? "Elige una contraseña nueva para recuperar el acceso a tu cuenta." : authMode === "register" ? "Aprende Lengua de Señas Mexicana a tu ritmo y guarda tu progreso en tu cuenta." : "Entra para continuar con tu espacio de aprendizaje."}</p></div>
        <form className="auth-form" onSubmit={submitAuth}>
          {authRecoveryMode && <>
            <label>Nueva contraseña<span className="auth-input-wrap"><span className="auth-field-icon">▣</span><input autoComplete="new-password" type={showAuthPassword ? "text" : "password"} placeholder="••••••••" minLength={6} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} required /><button className="auth-eye" type="button" aria-label="Mostrar u ocultar contraseña" onClick={() => setShowAuthPassword(!showAuthPassword)}>◉</button></span></label>
            <label>Confirmar nueva contraseña<span className="auth-input-wrap"><span className="auth-field-icon">▣</span><input autoComplete="new-password" type={showAuthPasswordConfirm ? "text" : "password"} placeholder="••••••••" minLength={6} value={authPasswordConfirm} onChange={(e) => setAuthPasswordConfirm(e.target.value)} required /><button className="auth-eye" type="button" aria-label="Mostrar u ocultar contraseña" onClick={() => setShowAuthPasswordConfirm(!showAuthPasswordConfirm)}>◉</button></span></label>
          </>}
          {!authRecoveryMode && authMode === "register" && <>
            <label>Nombre completo<span className="auth-input-wrap"><span className="auth-field-icon">♙</span><input autoComplete="name" placeholder="Juan Pérez" value={authName} onChange={(e) => setAuthName(e.target.value)} required /></span></label>
            <label>Correo electrónico<span className="auth-input-wrap"><span className="auth-field-icon">✉</span><input autoComplete="email" type="email" placeholder="juan.perez@empresa.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} required /></span></label>
            <label>Institución <span className="auth-optional">(opcional)</span><span className="auth-input-wrap"><span className="auth-field-icon">▤</span><input autoComplete="organization" placeholder="Nombre de tu escuela u organización" value={authCompany} onChange={(e) => setAuthCompany(e.target.value)} /></span></label>
            <label>Contraseña<span className="auth-input-wrap"><span className="auth-field-icon">▣</span><input autoComplete="new-password" type={showAuthPassword ? "text" : "password"} placeholder="••••••••" minLength={6} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} required /><button className="auth-eye" type="button" aria-label="Mostrar u ocultar contraseña" onClick={() => setShowAuthPassword(!showAuthPassword)}>◉</button></span></label>
            <label>Confirmar contraseña<span className="auth-input-wrap"><span className="auth-field-icon">▣</span><input autoComplete="new-password" type={showAuthPasswordConfirm ? "text" : "password"} placeholder="••••••••" minLength={6} value={authPasswordConfirm} onChange={(e) => setAuthPasswordConfirm(e.target.value)} required /><button className="auth-eye" type="button" aria-label="Mostrar u ocultar contraseña" onClick={() => setShowAuthPasswordConfirm(!showAuthPasswordConfirm)}>◉</button></span></label>
            <label className="auth-terms"><input type="checkbox" checked={authAcceptedTerms} onChange={(e) => setAuthAcceptedTerms(e.target.checked)} required /><span>He leído y acepto los <a href="#terminos" onClick={(e) => { e.preventDefault(); setAuthLegalView("terms"); }}>Términos de Servicio</a> y la <a href="#privacidad" onClick={(e) => { e.preventDefault(); setAuthLegalView("privacy"); }}>Política de Privacidad</a>.</span></label>
          </>}
          {!authRecoveryMode && authMode === "login" && <>
            <label>Correo electrónico<span className="auth-input-wrap"><span className="auth-field-icon">✉</span><input autoComplete="email" type="email" placeholder="juan.perez@empresa.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} required /></span></label>
            <label>Contraseña<span className="auth-input-wrap"><span className="auth-field-icon">▣</span><input autoComplete="current-password" type={showAuthPassword ? "text" : "password"} placeholder="Tu contraseña" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} required /><button className="auth-eye" type="button" onClick={() => setShowAuthPassword(!showAuthPassword)}>◉</button></span></label>
          </>}
          {!authRecoveryMode && authMode === "login" && <button className="auth-forgot" type="button" onClick={sendPasswordReset} disabled={authBusy}>¿Olvidaste tu contraseña?</button>}
          {authMessage && <p className="auth-feedback" role="status">{authMessage}</p>}
          {!isSupabaseConfigured && <p className="auth-feedback">El servicio de cuentas aún no está configurado.</p>}
          <button className="auth-submit" type="submit" disabled={authBusy || !isSupabaseConfigured}>{authBusy ? "Un momento…" : authMode === "register" ? "Crear Cuenta" : "Iniciar Sesión"}<span>→</span></button>
        </form>
        {!authRecoveryMode && <div className="auth-switch">{authMode === "register" ? "¿Ya tienes una cuenta?" : "¿Aún no tienes cuenta?"}<button type="button" onClick={() => { setAuthMode(authMode === "register" ? "login" : "register"); setAuthMessage(""); }}> {authMode === "register" ? "Iniciar Sesión" : "Crear cuenta"}</button></div>}
        {!authRecoveryMode && authMode === "register" && <div className="auth-social"><div className="auth-divider"><span>O regístrate con</span></div><div className="auth-social-row"><button type="button" onClick={() => signInWithProvider("google")} disabled={authBusy || !isSupabaseConfigured}><b className="google-mark">G</b>Google</button><button type="button" onClick={() => signInWithProvider("linkedin_oidc")} disabled={authBusy || !isSupabaseConfigured}><b className="linkedin-mark">in</b>LinkedIn</button></div><p>También puedes registrarte con tu correo y contraseña.</p></div>}
      </div></section>
      {authLegalView && <div className="auth-legal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAuthLegalView(null); }}>
        <section className="auth-legal-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-legal-title">
          <button className="auth-legal-close" type="button" aria-label="Cerrar" onClick={() => setAuthLegalView(null)}>×</button>
          <h2 id="auth-legal-title">{authLegalView === "terms" ? "Términos de Servicio" : "Política de Privacidad"}</h2>
          {authLegalView === "terms" ? <>
            <p>Al crear una cuenta en Signari, aceptas utilizar la plataforma de manera lícita y respetuosa.</p>
            <h3>Uso de la plataforma</h3><p>Signari ofrece recursos educativos introductorios sobre Lengua de Señas Mexicana. El contenido puede actualizarse y no sustituye la enseñanza impartida por personas expertas ni la interacción con la comunidad sorda.</p>
            <h3>Tu cuenta</h3><p>Eres responsable de mantener la confidencialidad de tus credenciales y de proporcionar información veraz. No compartas tu contraseña.</p>
            <h3>Contenido y disponibilidad</h3><p>Algunas unidades pueden estar en preparación. Procuraremos mantener el servicio disponible, aunque pueden existir interrupciones o cambios.</p>
          </> : <>
            <p>Signari utiliza los datos que proporcionas para crear y administrar tu cuenta y guardar tu avance de aprendizaje.</p>
            <h3>Datos que tratamos</h3><p>Podemos almacenar nombre, correo electrónico, empresa si la proporcionas, identificador de cuenta y progreso de lecciones.</p>
            <h3>Uso y almacenamiento</h3><p>La autenticación y los datos de cuenta se gestionan mediante Supabase. El progreso puede guardarse en este dispositivo y sincronizarse con tu cuenta.</p>
            <h3>Tus opciones</h3><p>No introduzcas información sensible en los campos de perfil. Puedes dejar de usar el servicio y solicitar información o apoyo sobre tus datos mediante los canales de contacto que Signari publique.</p>
          </>}
          <p className="auth-legal-note">Aviso: este texto es una versión inicial informativa y debe revisarse y completarse con los datos legales y de contacto del responsable de Signari antes de su lanzamiento público.</p>
          <button className="auth-legal-accept" type="button" onClick={() => setAuthLegalView(null)}>Entendido</button>
        </section>
      </div>}
    </main>
  );

  return (
    <div className="app-layout">
      <aside className={\`sidebar \${mobileMenu ? "sidebar-open" : ""}\`}>
        <a className="brand" href="#inicio" onClick={() => setView("home")}><span className="brand-mark">S</span><span>SIGNARI</span></a>
        <nav className="enterprise-nav" aria-label="Navegación principal">
          <button className={\`nav-item \${view === "home" ? "active" : ""}\`} onClick={() => { setView("home"); setMobileMenu(false); }}><span aria-hidden="true">▤</span>Aprender</button>
          <button className="nav-item" onClick={() => { setView("home"); setMobileMenu(false); }}><span aria-hidden="true">▥</span>Diccionario LSM</button>
          <button className={\`nav-item \${view === "practice" ? "active" : ""}\`} onClick={startPractice}><span aria-hidden="true">☷</span>Retos Diarios</button>
          <button className="nav-item" onClick={() => setView("home")}><span aria-hidden="true">♛</span>Premium</button>
          <button className="nav-item" onClick={() => setView("home")}><span aria-hidden="true">♙</span>Perfil</button>
        </nav>
        <div className="sidebar-account enterprise-account">
          {authUser ? <><strong>Sesión conectada</strong><p>{authUser.email}</p><button className="account-button" onClick={signOut}>Cerrar sesión</button><small>{cloudReady ? "Progreso sincronizado" : "Conectando progreso…"}</small></> : <><strong>Cuenta Signari</strong><p>Inicia sesión para sincronizar tu aprendizaje.</p></>}
        </div>
        <div className="sidebar-bottom"><p>Lengua de Señas Mexicana</p></div>
      </aside>

      <main className="main-area">
        <header className="app-header"><button className="mobile-menu" aria-label="Abrir menú" onClick={() => setMobileMenu(!mobileMenu)}>☰</button><div className="breadcrumb">Signari <span>/</span> {view === "practice" ? "Práctica" : view === "lesson" ? activeModule.title : "Mi aprendizaje"}</div><span className="header-pill">LSM · Nivel inicial</span></header>

        {view === "home" && <div className="enterprise-dashboard">
          <section className="enterprise-center">
            <div className="enterprise-module-banner">
              <div><span className="enterprise-eyebrow">RUTA DE APRENDIZAJE · NIVEL INICIAL</span><h1>MÓDULO 1: Fundamentos y Saludos en LSM</h1><p>Avanza a tu ritmo y desarrolla tus habilidades de comunicación visual.</p></div>
              <div className="enterprise-module-progress"><div><span>8 / 25 tareas</span><strong>32%</strong></div><div className="enterprise-track"><span style={{width:"32%"}} /></div><button className="enterprise-continue" onClick={() => openLesson(modules[0], modules[0].lessons[0])}>CONTINUAR</button></div>
            </div>
            <section className="enterprise-path-section">
              <div className="enterprise-section-heading"><span className="enterprise-eyebrow">PROGRAMA DEL MÓDULO</span><h2>Ruta de aprendizaje</h2></div>
              <div className="enterprise-path">
                <div className="enterprise-path-line" />
                <article className="enterprise-node completed"><span className="enterprise-node-icon">✓</span><div className="enterprise-node-copy"><span className="enterprise-node-kicker">SUBMÓDULO 01 · COMPLETADO</span><h3>Introducción</h3><p>5 de 5 tareas finalizadas</p></div><span className="enterprise-node-status">COMPLETADO</span></article>
                <article className="enterprise-node active"><span className="enterprise-node-icon">手</span><div className="enterprise-node-copy"><span className="enterprise-node-kicker">SUBMÓDULO 02 · EN CURSO</span><h3>El Alfabeto</h3><p>2 de 5 tareas completadas</p></div><button className="enterprise-start" onClick={() => openLesson(modules[0], modules[0].lessons[0])}>EMPEZAR</button></article>
                <article className="enterprise-node locked"><span className="enterprise-node-icon">⌑</span><div className="enterprise-node-copy"><span className="enterprise-node-kicker">SUBMÓDULO 03 · BLOQUEADO</span><h3>Saludos y cortesía</h3><p>Completa el submódulo anterior para continuar</p></div><span className="enterprise-lock">⌑</span></article>
                <article className="enterprise-node locked"><span className="enterprise-node-icon">⌑</span><div className="enterprise-node-copy"><span className="enterprise-node-kicker">SUBMÓDULO 04 · BLOQUEADO</span><h3>Presentaciones</h3><p>Completa el submódulo anterior para continuar</p></div><span className="enterprise-lock">⌑</span></article>
                <article className="enterprise-node locked"><span className="enterprise-node-icon">⌑</span><div className="enterprise-node-copy"><span className="enterprise-node-kicker">SUBMÓDULO 05 · BLOQUEADO</span><h3>Primeras conversaciones</h3><p>Completa el submódulo anterior para continuar</p></div><span className="enterprise-lock">⌑</span></article>
              </div>
            </section>
            <footer className="enterprise-footer"><span>SIGNARI</span><span>Lengua de Señas Mexicana · Aprende, practica y conecta.</span></footer>
          </section>
          <aside className="enterprise-right">
            <section className="enterprise-metrics"><div><span className="metric-symbol flame">♨</span><strong>4 días</strong><small>RACHA</small></div><div><span className="metric-symbol xp">ϟ</span><strong>120 XP</strong><small>EXPERIENCIA</small></div><div><span className="metric-symbol crown">♛</span><strong>Premium</strong><small>CUENTA</small></div></section>
            <section className="enterprise-card objectives-card"><div className="enterprise-card-title"><h2>Objetivos Académicos</h2><span>SEMANA ACTUAL</span></div><label className="enterprise-check-row"><input type="checkbox" defaultChecked />Completar una sesión de aprendizaje</label><label className="enterprise-check-row"><input type="checkbox" />Repasar vocabulario</label><label className="enterprise-check-row"><input type="checkbox" />Practicar lo aprendido</label><div className="enterprise-week-progress"><span>Progreso semanal</span><strong>1 / 7 días</strong></div><div className="enterprise-track"><span style={{width:"14.28%"}} /></div></section>
            <section className="enterprise-card dictionary-card"><div className="enterprise-card-title"><h2>Diccionario LSM</h2><span>ÚLTIMA SEÑA</span></div><div className="dictionary-visual"><div className="dictionary-placeholder"><span>HOLA</span><small>RECURSO VISUAL EN VALIDACIÓN</small></div></div><div className="dictionary-word"><strong>Hola</strong><span>Saludo · LSM</span></div><p>La fotografía de referencia se añadirá cuando el material esté validado por una fuente competente en LSM.</p></section>
            <section className="enterprise-premium"><span className="premium-overline">EXPERIENCIA EXCLUSIVA</span><h2>SIGNARI <em>Premium</em></h2><p>Aprende sin anuncios y apoya el crecimiento de la plataforma.</p><button onClick={() => setView("home")}><span>♙</span> GESTIÓN DE CUENTA</button></section>
          </aside>
        </div>}

        {view === "lesson" && <div className="content-wrap lesson-wrap"><button className="back-link" onClick={() => setView("home")}>← Volver a módulos</button><div className="lesson-layout"><article className="lesson-main"><div className="section-kicker">{activeModule.title.toUpperCase()}</div><div className="lesson-meta"><span>{activeModule.level}</span><span>·</span><span>{activeLesson.duration}</span></div><h1 className="lesson-title">{activeLesson.title}</h1><p className="lesson-lead">{activeLesson.summary}</p>{activeLesson.pending && <div className="notice-box"><strong>Unidad en preparación</strong><p>Estamos reuniendo material visual con fuentes identificables y revisión especializada. Esta lección no cuenta para tu avance todavía.</p></div>}{activeLesson.sections.map((section, index) => <section className="lesson-section" key={section.heading}><span className="lesson-section-number">0{index + 1}</span><div><h2>{section.heading}</h2><p>{section.body}</p></div></section>)}<div className="lesson-complete">{completed.includes(activeLesson.id) ? <><span className="complete-check">✓</span><div><strong>Lección completada</strong><p>Tu avance quedó guardado en este dispositivo.</p></div></> : <><div><strong>¿Terminaste esta lección?</strong><p>Marca la lección como completada para registrar tu avance.</p></div><button className="button-primary" disabled={activeLesson.pending} onClick={markComplete}>Marcar como completada</button></>}</div></article><aside className="lesson-aside"><div className="aside-card"><div className="section-kicker">EN ESTE MÓDULO</div><h3>{activeModule.title}</h3>{activeModule.lessons.map((lesson, index) => <button key={lesson.id} className={`lesson-list-item ${lesson.id === activeLesson.id ? "current" : ""}`} onClick={() => openLesson(activeModule, lesson)}><span className="lesson-list-number">{completed.includes(lesson.id) ? "✓" : `0${index + 1}`}</span><span>{lesson.title}<small>{lesson.duration}</small></span></button>)}</div><div className="source-note"><strong>Aprendizaje responsable</strong><p>Las unidades con señas y vocabulario visual se publicarán después de verificar sus fuentes y obtener la revisión correspondiente.</p></div></aside></div></div>}

        {view === "practice" && <div className="content-wrap practice-wrap"><button className="back-link" onClick={() => setView("home")}>← Volver a mi aprendizaje</button><div className="practice-heading"><div className="section-kicker">REPASO · NIVEL INICIAL</div><h1>Vamos a practicar.</h1><p>Responde estas preguntas sobre los fundamentos de la LSM.</p></div>{submitted ? <section className="result-card"><div className="result-icon">{score === questions.length ? "✦" : "✓"}</div><div className="section-kicker">RESULTADO DE TU PRÁCTICA</div><h2>{score} de {questions.length} respuestas correctas</h2><p>{score === questions.length ? "¡Excelente! Has comprendido los conceptos principales." : "Buen esfuerzo. Revisa las respuestas correctas y vuelve a intentarlo cuando quieras."}</p><div className="result-explanations">{questions.map((item, index) => <div key={item.question}><strong>{index + 1}. {item.question}</strong><p>{answers[index] === item.correct ? "Correcto. " : `Respuesta correcta: ${item.answers[item.correct]}. `}{item.explanation}</p></div>)}</div><div className="result-actions"><button className="button-primary" onClick={startPractice}>Intentar de nuevo</button><button className="button-secondary" onClick={() => setView("home")}>Volver al inicio</button></div></section> : <><div className="quiz-progress"><span>{Object.keys(answers).length} de {questions.length} respondidas</span><div className="progress-track"><span style={{ width: `${Object.keys(answers).length / questions.length * 100}%` }} /></div></div><div className="quiz-list">{questions.map((item, index) => <section className="quiz-card" key={item.question}><div className="question-number">PREGUNTA 0{index + 1}</div><h2>{item.question}</h2><div className="answer-list">{item.answers.map((answer, answerIndex) => <button key={answer} className={`answer-option ${answers[index] === answerIndex ? "chosen" : ""}`} onClick={() => setAnswers((current) => ({ ...current, [index]: answerIndex }))}><span className="answer-letter">{String.fromCharCode(65 + answerIndex)}</span>{answer}<span className="answer-radio" /></button>)}</div></section>)}</div><div className="quiz-submit"><span>Podrás revisar las explicaciones al finalizar.</span><button className="button-primary" disabled={Object.keys(answers).length !== questions.length} onClick={() => setSubmitted(true)}>Revisar respuestas <span>→</span></button></div></>}</div>}
      </main>
      {mobileMenu && <button className="mobile-scrim" aria-label="Cerrar menú" onClick={() => setMobileMenu(false)} />}
    </div>
  );
}
