# Signari

Plataforma educativa para aprender Lengua de Señas Mexicana (LSM), disponible como sitio web adaptable y aplicación Android.

## Objetivo

Facilitar el aprendizaje de LSM mediante lecciones visuales, práctica guiada, actividades y seguimiento del progreso. El contenido deberá desarrollarse con fuentes confiables y revisión de personas con conocimiento de LSM y de la comunidad sorda.

## Plataformas

- **Web:** aplicación responsive.
- **Android:** aplicación instalable construida a partir del frontend compartido.
- **Cuenta y progreso:** sincronización mediante un backend común.

## Arquitectura prevista

- Frontend: React + TypeScript + Vite.
- Android: Capacitor.
- Backend y datos: Supabase (autenticación, PostgreSQL y almacenamiento).
- Publicación web: Netlify.
- Control de versiones: GitHub.

Netlify se utilizará para publicar la web; no sustituye la base de datos. Supabase será el servicio de backend previsto. Las claves privadas nunca deben guardarse en el frontend ni subirse al repositorio.

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
└── README.md
```

## Desarrollo local

Requisitos previstos: Node.js LTS y npm.

Cuando se complete el primer esqueleto del frontend:

```bash
cd frontend
npm install
npm run dev
```

Consulta la documentación de arquitectura en `documentacion/arquitectura/README.md`.

## Principios del proyecto

- Accesibilidad, diseño adaptable y lenguaje claro.
- Respetar la diversidad regional y cultural de la LSM.
- No inventar ni presentar señas sin fuente y validación.
- Proteger los datos personales y el progreso de los estudiantes.
- Funciones gratuitas esenciales; Premium será voluntario.
- Publicidad discreta: nunca dentro de actividades, tareas o contenido de trabajo. Los videos recompensados serán opcionales.
- La compra Premium podrá retirar los anuncios, sin bloquear el aprendizaje básico.

## Estado

Repositorio inicial: documentación y estructura base. Las funciones educativas, autenticación, sincronización, administración y monetización se implementarán y probarán por etapas.
