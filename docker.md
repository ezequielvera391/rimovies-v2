# Rimovies V2 - Docker Setup

Este proyecto Angular está dockerizado para facilitar su despliegue en entornos de desarrollo y producción.

## 🔗 Tabla de contenido
- [Requisitos](#requisitos)
- [Modos de ejecución](#modos-de-ejecución)
  - [Desarrollo](#desarrollo)
  - [Producción](#producción)
- [Estructura relevante](#estructura-relevante)
- [Información del build](#información-del-build)
- [Comandos útiles](#comandos-útiles)
- [Flujo diario recomendado](#flujo-diario-recomendado)
- [Notas adicionales](#notas-adicionales)
- [Mejoras futuras](#mejoras-futuras)

---

## Requisitos

- Docker Desktop instalado y corriendo en tu máquina.
- WSL 2 habilitado (Ubuntu recomendado).
- Acceso a terminal Bash (WSL).

---

## Modos de ejecución

### Desarrollo

En desarrollo la aplicación corre usando `ng serve` dentro de un contenedor Node.js. Permite hot-reload sin necesidad de rebuild.

Ahora contamos con un script especial preparado para entornos Docker.

#### Levantar en desarrollo

```bash
docker-compose -f docker-compose.dev.yml up
```

Acceder en el navegador:

```
http://localhost:4200
```

#### Script usado en desarrollo

Dentro del `package.json`, se utiliza:

```json
"start:docker": "ng serve --host 0.0.0.0 --poll=1000 --configuration=development"
```

Este script garantiza que Angular detecte cambios de archivos correctamente dentro de contenedores.

#### Detener en desarrollo

```bash
docker-compose -f docker-compose.dev.yml down
```

---

### Producción

En producción se construye la app Angular y se sirve mediante Nginx.

#### Construir y levantar en producción

Simplemente ejecutá:

```bash
./build.sh
```

Este script:
- Obtiene la fecha, el branch y el commit actual.
- Ejecuta `docker-compose up --build` pasando esos datos como argumentos de build.

Acceder en el navegador:

```
http://localhost:8080
```

#### Detener en producción

```bash
docker-compose down
```

---

## Estructura relevante

| Archivo                     | Descripción                                                  |
|:-----------------------------|:------------------------------------------------------------|
| `Dockerfile`                 | Build de Angular y configuración de Nginx.                   |
| `docker-compose.yml`         | Levanta app en **producción**.                              |
| `docker-compose.dev.yml`     | Levanta app en **desarrollo** usando script `start:docker`.   |
| `build.sh`                   | Script automatizado que construye imagen y levanta contenedor.|
| `nginx.conf`                 | Config personalizado de Nginx para rutas SPA.                |
| `.dockerignore`              | Ignora archivos innecesarios al construir la imagen.         |
| `package.json`               | Contiene el script `start:docker` para entorno de desarrollo.|

---

## Información del build

Accedé a `/version.html` para ver detalles del build actual:

- Fecha y hora de build
- Rama de Git utilizada
- Commit utilizado

Ejemplo:

```
http://localhost:8080/version.html
```

---

## Comandos útiles

| Acción                  | Comando |
|:-------------------------|:--------|
| Construir y levantar en producción  | `./build.sh` |
| Levantar app en dev      | `docker-compose -f docker-compose.dev.yml up` |
| Detener app              | `docker-compose down` (agregar `-f docker-compose.dev.yml` si es dev) |
| Limpiar imágenes/volúmenes | `docker system prune -af` (precaución) |

---

## Flujo diario recomendado

| Situación | Acción recomendada |
|:----------|:------------------|
| Desarrollo diario | `docker-compose -f docker-compose.dev.yml up` |
| Preparar build para deploy | `./build.sh` |
| Detener app | `docker-compose down` |

---

## Notas adicionales

- Docker Desktop debe estar corriendo antes de ejecutar cualquier comando.
- Puertos expuestos:
  - Desarrollo: `4200`
  - Producción: `8080`
- Nginx está configurado para manejar rutas internas con `try_files`.
- Para entornos Docker en desarrollo, se utiliza `--poll=1000` para garantizar la detección de cambios.

---

## Mejoras futuras

- Automatizar build y deploy mediante CI/CD (GitHub Actions, GitLab CI).
- Crear `docker-compose.staging.yml` para entorno de testing.

