FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

FROM nginx:stable-alpine

# Declaramos los argumentos que vamos a recibir para el log
ARG BUILD_DATE
ARG GIT_BRANCH
ARG GIT_COMMIT

COPY --from=builder /app/dist/rimovies-v2 /usr/share/nginx/html

# Copiar configuración personalizada de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Log
RUN echo "<html><body>" \
    "<b>Build time:</b> ${BUILD_DATE}<br/>" \
    "<b>Git branch:</b> ${GIT_BRANCH}<br/>" \
    "<b>Git commit:</b> ${GIT_COMMIT}" \
    "</body></html>" > /usr/share/nginx/html/version.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
