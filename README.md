# Proyecto: SPA (Single Page Application) - Gestión de Productos

Este proyecto es una aplicación web de gestión de productos desarrollada con Laravel (Backend) y Vue.js (Frontend), implementando buenas prácticas de desarrollo, incluyendo una suite de pruebas automatizadas completa para garantizar la calidad del código.

## Tecnologías Utilizadas

- **Backend:** Laravel (API REST, Eloquent ORM, Sanctum para autenticación).
- **Frontend:** Vue.js 3, Pinia (gestión de estado), Vitest (testing).
- **Base de Datos:** SQLite (en memoria para pruebas).

## Pruebas Automatizadas
El proyecto cumple con los criterios de testing de la Práctica 10, alcanzando una cobertura al 70%.

### Ejecutar Backend
Para ejecutar las pruebas de integración del API:
```bash
php artisan test --filter ProductoTest
```

## Ejecutar Frontend
Para ejecutar las pruebas unitarias y de componentes:
```bash
cd practica3-frontend
npm run test
```

**Desarrollado por:** Jared Hernández González - Universidad Politécnica de Texcoco (UPTex) 