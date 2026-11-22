# Arquitectura de Signari

## Componentes

1. **Frontend React + TypeScript:** interfaz compartida para web y Android.
2. **Vite:** desarrollo y compilación del frontend.
3. **Capacitor:** empaquetado del frontend como aplicación Android.
4. **Supabase:** autenticación, base de datos y almacenamiento.
5. **Netlify:** publicación del sitio web estático.
6. **GitHub:** repositorio y seguimiento de cambios.

## Flujo general

El navegador o la aplicación Android utilizan el mismo frontend. Ambos se conectarán al mismo backend Supabase, de modo que la cuenta y el progreso puedan sincronizarse entre dispositivos.

## Monetización acordada como propuesta

- Acceso gratuito al aprendizaje esencial.
- Premium voluntario: $20 MXN al mes o $199 MXN de por vida (precios propuestos, sujetos a validación).
- Publicidad discreta por módulo.
- Sin anuncios dentro de tareas, trabajos ni contenido de aprendizaje.
- Videos recompensados siempre opcionales.
- Premium elimina los anuncios.

La integración publicitaria y los pagos requieren configuración, revisión y cumplimiento de las políticas de cada plataforma. No se simularán compras ni anuncios durante el desarrollo.

## Decisiones pendientes antes de producción

- Proyecto Supabase y políticas RLS.
- Dominio y variables de entorno de Netlify.
- Identidad visual definitiva y recursos de marca.
- Fuentes, permisos y validación del contenido de LSM.
- Requisitos de publicación en Google Play y distribución APK.
- Aviso de privacidad, términos y mecanismos de soporte.
