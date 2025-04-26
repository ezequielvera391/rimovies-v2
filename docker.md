# Rimovies V2 - Docker Setup

Este proyecto Angular está dockerizado para facilitar su despliegue en entornos de desarrollo y producción.

## Requisitos

- Docker Desktop instalado y corriendo en tu máquina.
- WSL 2 habilitado (Ubuntu recomendado).
- Acceso a terminal Bash (WSL).

## Cómo construir y correr la app

1. Abrí una terminal WSL (Ubuntu).
2. Navegá a la carpeta del proyecto (ajustá la ruta según donde hayas clonado o guardado el proyecto):

```bash
cd /ruta/a/tu/proyecto/rimovies-v2
```

3. Ejecutá el script para construir la imagen:

```bash
./build.sh
```

4. Levantá la app con Docker Compose:

```bash
docker-compose up --build
```

5. Abrí tu navegador en:

```
http://localhost:8080
```

## Estructura relevante

| Archivo | Descripción |
|:---|:---|
| `Dockerfile` | Define el proceso de build y serve de la app Angular usando NGINX. |
| `docker-compose.yml` | Facilita levantar la app usando Docker Compose. |
| `build.sh` | Script de automatización para construir la imagen Docker con información de fecha, branch y commit. |
| `nginx.conf` | Configuración personalizada para NGINX que permite el enrutamiento correcto de la app Angular. |

## Información del build

Accedé al archivo `/version.html` para ver los detalles del build actual:

- Fecha y hora de build
- Rama de Git utilizada
- Commit utilizado

Ejemplo de acceso:

```
http://localhost:8080/version.html
```

## Comandos útiles

| Acción | Comando |
|:---|:---|
| Construir imagen | `./build.sh` |
| Levantar app | `docker-compose up --build` |
| Detener app | `docker-compose down` |

## Flujo diario de trabajo

| Situación | Acción recomendada |
|:---|:---|
| No cambiaste el código Angular | `docker-compose up` |
| Cambiaste el código Angular o configuración | `./build.sh` y luego `docker-compose up --build` |
| Querés detener la app | `docker-compose down` |

Notas:
- Recordá que si modificás el código fuente debes reconstruir la imagen para que los cambios se reflejen.
- Si necesitás limpiar imágenes o contenedores antiguos podés usar `docker system prune -af` (con precaución).

---

# Notas adicionales

- Asegurate de que Docker Desktop esté corriendo antes de ejecutar cualquier comando.
- El puerto expuesto por defecto es el `8080`.
- El servidor NGINX fue configurado para manejar correctamente rutas internas de Angular mediante `try_files`.

## Mejoras futuras

- Crear archivos separados `docker-compose.staging.yml` y `docker-compose.prod.yml` para distintos entornos.
- Integrar un pipeline de CI/CD (GitHub Actions, GitLab CI) para construir y desplegar automáticamente.

