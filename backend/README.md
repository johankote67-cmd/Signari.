# Backend de Signari

El backend centralizará autenticación, perfiles y progreso de aprendizaje.

## Servicio previsto

Supabase:
- Auth para registro e inicio de sesión.
- PostgreSQL para perfiles y progreso.
- Row Level Security (RLS) para que cada cuenta solo pueda consultar y modificar sus propios datos.
- Storage para recursos multimedia cuando corresponda.

## Esquema inicial

La migración `supabase/migrations/0001_profiles_and_progress.sql` crea:
- `profiles`: perfil asociado al identificador de Auth.
- `lesson_progress`: lecciones completadas por usuario.
- Políticas RLS para lectura, escritura y eliminación limitadas al propietario.
- Un trigger que crea el perfil al registrar una cuenta.

Las tablas no son públicas: las operaciones requieren una sesión autenticada. La clave pública del cliente no sustituye RLS.

## Variables del frontend

Copia `frontend/.env.example` como `frontend/.env.local` y configura:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (o publishable key compatible del proyecto)

No uses nunca la clave `service_role` en el navegador, en Android ni en GitHub. No subas archivos `.env.local`.

## Activación pendiente

1. Crear un proyecto Supabase.
2. Ejecutar la migración SQL en el SQL Editor.
3. Copiar URL y clave pública a `frontend/.env.local`.
4. Implementar y probar registro, inicio/cierre de sesión y sincronización.
5. Configurar políticas adicionales y revisar privacidad antes de datos reales.

Todavía no existe una conexión activa a un proyecto Supabase. El progreso de la interfaz continúa guardándose localmente hasta completar y probar la integración de cuentas.
