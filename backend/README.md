# Backend de Signari

El backend centraliza autenticación, perfiles y progreso de aprendizaje mediante Supabase.

## Proyecto conectado

- Proyecto: `johankote67-cmd's Project`
- Región: US East (N. Virginia).
- Estado comprobado: activo y saludable.
- Migración aplicada: `profiles_and_lesson_progress`.

## Esquema inicial aplicado

La migración `supabase/migrations/0001_profiles_and_progress.sql` crea:

- `profiles`: perfil asociado al identificador de Supabase Auth.
- `lesson_progress`: lecciones completadas por usuario.
- Políticas RLS de lectura, inserción, actualización y eliminación limitadas al propietario.
- Trigger interno que crea el perfil al registrar una cuenta.
- Trigger que mantiene actualizado `updated_at`.

Las dos tablas tienen RLS habilitado. Las funciones internas del trigger no se pueden invocar desde los roles públicos de la API.

## Variables del frontend

El cliente usa estas variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (puede contener la publishable key moderna `sb_publishable_...`).

Para desarrollo local, copia `frontend/.env.example` como `frontend/.env.local` y completa los valores desde la configuración API del proyecto. En el despliegue web, define las mismas variables en el panel de Netlify; para Android, configura el entorno de compilación correspondiente.

No uses nunca la clave `service_role` ni una secret key en navegador, Android o GitHub. No subas archivos `.env.local`.

## Estado

La base de datos ya está creada y la migración inicial está aplicada y verificada. El siguiente trabajo es integrar registro, inicio/cierre de sesión y sincronización del progreso en el frontend, conservando el modo local cuando no haya configuración.
