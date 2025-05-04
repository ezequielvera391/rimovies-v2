# Rimovies V2

Rimovies V2 es un proyecto de estudio con el objetivo de practicar, probar y demostrar habilidades en:

- Angular moderno (standalone components, buenas prácticas)
- Docker y despliegue de aplicaciones frontend
- Automatización de builds
- Integración con datasets generados por scraping

El proyecto está en constante evolución. Toda sugerencia, corrección o aporte es más que bienvenido.

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
- [Alternativa: levantar sin Docker](#alternativa-levantar-sin-docker)
- [Testing](#testing)
- [Dataset de películas (opcional)](#dataset-de-películas-opcional)
- [Sobre este proyecto](#sobre-este-proyecto)

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

#### Build y despliegue en producción

Utilizamos el script `build.sh`, que permite hacer un build completo y levantar la app en un solo paso. Además, ofrece la opción de forzar un build limpio sin usar cache.

##### Build rápido (usando cache)

```bash
./build.sh
```

##### Build limpio (sin usar cache)

```bash
./build.sh --no-cache
```

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
| `build.sh`                   | Script automatizado para construir imagen, permite `--no-cache`.|
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
| Construir imagen rápido  | `./build.sh` |
| Construir imagen limpio  | `./build.sh --no-cache` |
| Levantar app en dev      | `docker-compose -f docker-compose.dev.yml up` |
| Detener app              | `docker-compose down` (agregar `-f docker-compose.dev.yml` si es dev) |
| Limpiar imágenes/volúmenes | `docker system prune -af` (precaución) |

---

## Flujo diario recomendado

| Situación | Acción recomendada |
|:----------|:------------------|
| Desarrollo diario | `docker-compose -f docker-compose.dev.yml up` |
| Preparar build para deploy | `./build.sh --no-cache` |
| Detener app | `docker-compose down` |

---

## Notas adicionales

- Docker Desktop debe estar corriendo antes de ejecutar cualquier comando.
- Puertos expuestos:
  - Desarrollo: `4200`
  - Producción: `8080`
- Nginx está configurado para manejar rutas internas con `try_files`.
- Para entornos Docker en desarrollo, se utiliza `--poll=1000` para garantizar la detección de cambios.
- `version.html` se genera dinámicamente al arrancar el contenedor y no se cachea en navegador (gracias a la configuración en `nginx.conf`).

---

## Mejoras futuras

- Automatizar build y deploy mediante CI/CD (GitHub Actions, GitLab CI).
- Crear `docker-compose.staging.yml` para entorno de testing.

---

## Alternativa: levantar sin Docker

Esta sección es solo para quienes deseen ejecutar el proyecto Angular **sin usar Docker**. En este caso sí es necesario tener instalado Angular CLI y Node.js en la máquina local.

### Requisitos

- Node.js 18+
- Angular CLI

### Instalación del proyecto

```bash
npm install
```

### Levantar en modo desarrollo

```bash
ng serve
```

Accedé en tu navegador a:

```
http://localhost:4200
```

---

## Testing

El proyecto incluye pruebas unitarias para los componentes principales usando **Jasmine** y **Karma**, siguiendo las buenas prácticas de Angular moderno.

### Ejecutar tests

```bash
npm run test
```

Esto lanza el entorno de pruebas con Karma y muestra los resultados en tiempo real. Al finalizar, se genera un reporte de cobertura.

### Reporte de cobertura

El reporte se guarda automáticamente en:

```
/coverage/index.html
```

Podés abrir ese archivo en tu navegador para ver qué partes del código están cubiertas por tests y cuáles no.

### Buenas prácticas adoptadas

- Tests aislados con `TestBed` y `ComponentFixture`.
- Uso de spies y mocks para simular servicios.
- Cubrimos componentes standalone, pipes y lógica de negocio en componentes clave.
- Se busca alcanzar cobertura alta sin perder legibilidad.

### Tests en entorno Docker

Actualmente, los tests están pensados para ejecutarse fuera del contenedor. En futuras versiones se integrará un entorno de testing completo dentro de Docker o en un pipeline CI/CD.

---

## Dataset de películas (opcional)

Durante el desarrollo podés usar este proyecto complementario para generar un conjunto de datos realista basado en Letterboxd:

https://github.com/ezequielvera391/scraping-project

Este scraper genera:

- Pósters y covers de películas.
- Archivo JSON con información estructurada.
- Archivos listos para integrarse al frontend.

Ideal para entornos sin base de datos o para generar contenido de prueba automatizado.

---
