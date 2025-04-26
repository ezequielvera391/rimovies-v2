#!/bin/sh

echo "<html><body>" > /usr/share/nginx/html/version.html
echo "<b>Build time:</b> $BUILD_DATE<br/>" >> /usr/share/nginx/html/version.html
echo "<b>Git branch:</b> $GIT_BRANCH<br/>" >> /usr/share/nginx/html/version.html
echo "<b>Git commit:</b> $GIT_COMMIT" >> /usr/share/nginx/html/version.html
echo "</body></html>" >> /usr/share/nginx/html/version.html

# Iniciar nginx
nginx -g "daemon off;"
