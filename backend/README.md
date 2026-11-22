# Backend de Signari

El backend centralizará autenticación, perfiles, progreso de aprendizaje, catálogo de lecciones y configuración administrativa.

## Servicio previsto

Supabase:
- Auth para registro e inicio de sesión.
- PostgreSQL para datos relacionales.
- Row Level Security (RLS) para separar los datos de cada usuario.
- Storage para recursos multimedia cuando corresponda.

## Seguridad

- No subir claves privadas ni archivos `.env`.
- Las claves privilegiadas solo podrán usarse en entornos de servidor seguros.
- Definir políticas RLS antes de almacenar datos reales.
- No recopilar datos personales que no sean necesarios.

Todavía no hay conexión a un proyecto Supabase ni esquema de producción. Esa configuración se hará después de definir tablas, permisos y variables de entorno.
