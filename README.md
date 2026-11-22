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

El frontend ya incluye una primera experiencia educativa navegable: panel de aprendizaje, módulos y lecciones introductorias, práctica de conocimientos y progreso guardado localmente en el navegador. Las unidades de alfabeto y vocabulario permanecen en preparación hasta contar con material visual documentado y revisado.

Para iniciar el frontend:

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

## Estado actual

- [x] Estructura inicial y documentación del proyecto.
- [x] Panel educativo responsive con navegación por módulos.
- [x] Lecciones introductorias sobre LSM, comunidad sorda y comunicación visual.
- [x] Práctica de conocimientos con revisión de respuestas.
- [x] Seguimiento de avance guardado localmente en el navegador.
- [ ] Contenido visual de alfabeto y vocabulario, pendiente de fuentes y validación especializada.
- [ ] Cuentas, base de datos y sincronización entre dispositivos con Supabase.
- [ ] Aplicación Android con Capacitor.
- [ ] Panel administrativo, publicidad y Premium.

El progreso actual se almacena en el dispositivo y todavía no se sincroniza entre la web y Android. Esta versión es una base funcional de aprendizaje, no la plataforma final.
