# Signari

Plataforma educativa para aprender Lengua de Señas Mexicana (LSM), disponible como sitio web adaptable y aplicación Android.

## Objetivo

Facilitar el aprendizaje de LSM mediante lecciones visuales, práctica guiada, actividades y seguimiento del progreso. El contenido deberá desarrollarse con fuentes confiables y revisión de personas con conocimiento de LSM y de la comunidad sorda.

## Plataformas

- **Web:** aplicación responsive.
- **Android:** aplicación instalable construida a partir del frontend compartido.
- **Cuenta y progreso:** sincronización mediante un backend común.

## Arquitectura

- Frontend: React + TypeScript + Vite.
- Android: Capacitor.
- Backend y datos: Supabase (autenticación, PostgreSQL y almacenamiento).
- Publicación web: Netlify.
- Control de versiones: GitHub.

Netlify publica la web; no sustituye la base de datos. Supabase es el backend. Las claves privadas nunca deben guardarse en el frontend ni subirse al repositorio.

## Estructura

```
SIGNARI/
├── documentacion/
│   ├── arquitectura/
│   └── fuentes_lsm/
│       ├── diccionarios/
│       ├── abecedario/
│       ├── gramatica/
│       ├── vocabulario/
│       └── investigacion/
├── frontend/
├── backend/
├── supabase/
│   └── migrations/
└── README.md
```

## Desarrollo local

Requisitos: Node.js LTS y npm.

El frontend incluye una primera experiencia educativa navegable: panel de aprendizaje, módulos, lecciones introductorias, práctica y progreso local. El contenido visual de alfabeto y vocabulario se incorporará con fuentes y validación especializada.

Para iniciar:

```bash
cd frontend
npm install
npm run dev
```

## Principios

- Accesibilidad, diseño adaptable y lenguaje claro.
- Respetar la diversidad regional y cultural de la LSM.
- No inventar ni presentar señas sin fuente y validación.
- Proteger los datos personales y el progreso de los estudiantes.
- Funciones gratuitas esenciales; Premium voluntario.
- Publicidad discreta, nunca dentro de actividades o trabajos. Videos recompensados opcionales.
- Premium podrá retirar anuncios sin bloquear el aprendizaje básico.

## Estado del proyecto

- [x] Estructura inicial y documentación.
- [x] Panel educativo responsive y lecciones introductorias.
- [x] Práctica de conocimientos y progreso local.
- [x] Proyecto Supabase creado y activo.
- [x] Tablas de perfiles y progreso creadas con RLS.
- [x] Migración inicial aplicada y verificada.
- [ ] Integrar y probar registro, inicio/cierre de sesión y sincronización web/Android.
- [ ] Completar contenido visual LSM con fuentes y revisión especializada.
- [x] Dependencias y configuración inicial de Capacitor para Android.\n- [x] Flujo de GitHub Actions para generar un APK de depuración descargable como artefacto.\n- [ ] Generar y probar el APK en un dispositivo Android.
- [ ] Panel administrativo, publicidad y Premium.

La base de datos está lista para comenzar la integración de cuentas y sincronización. La interfaz todavía conserva el progreso local; no afirmar que la sincronización entre dispositivos está activa hasta implementarla y probarla.
\n## Aplicación Android\n\nLa app reutiliza el frontend web con Capacitor y el identificador `com.signari.app`. El flujo **Android APK** de GitHub Actions genera un APK de depuración cuando se actualiza `frontend/` en `main` o al ejecutarlo manualmente desde Actions. El APK se publica como artefacto temporal durante 14 días; todavía no es una versión firmada para distribución pública.\n