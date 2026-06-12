# Práctica 11: Sistema de Gestión de Pedidos

Esta práctica implementa un sistema de gestión de pedidos con procesamiento asíncrono utilizando Laravel Queues. El objetivo principal fue desacoplar el proceso de envío de notificaciones por correo electrónico del flujo principal de la API para mejorar la escalabilidad y la experiencia del usuario (UX).

# Características Principales

- **Procesamiento Asíncrono:** Uso de Laravel Queues (driver: database) para manejar envíos de correo en segundo plano.
- **API RESTful:** Endpoints protegidos mediante Laravel Sanctum para la creación y consulta de pedidos.
- **Monitoreo en Tiempo Real:** Implementación de polling en el frontend (Vue.js) para notificar al usuario el estado de su pedido sin recargar la página.
- **Integridad de Datos:** Uso de transacciones de base de datos para garantizar la consistencia en el stock y el registro del pedido.


## Tecnologías Utilizadas

- **Backend:** Laravel 11, PHP 8.x, MySQL/MariaDB.
- **Frontend:** Vue 3, Pinia (gestión de estado), Axios (peticiones HTTP), Vue Router.
- **Infraestructura:** Laravel Queues (Worker procesando jobs en segundo plano), Mailtrap (servidor SMTP de pruebas).

## Configuración de Entorno

- Clonar el repositorio.
- Ejecutar composer install y npm install.
- Configurar el archivo .env:
```bash
QUEUE_CONNECTION=database
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
# ... credenciales adicionales
```
- Ejecutar las migraciones: php artisan migrate.
- Iniciar el worker para procesar colas:
```bash
php artisan queue:work
```

**Desarrollado por:** Jared Hernández González - Universidad Politécnica de Texcoco (UPTex) 