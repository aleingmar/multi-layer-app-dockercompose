FROM nginx:stable

# Eliminar la configuración por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nuestra configuración
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar el HTML estático
COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
