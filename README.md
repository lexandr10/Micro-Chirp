Micro-Chirp

Невеликий додаток для мікроблогінгу:
- Реєстрація та вхід
- Публікація «chirps»
- Перегляд стрічки публікацій

---

## ⚙️ Технології

**Backend**:
- Node.js
- Express
- Knex.js
- PostgreSQL

**Frontend**:
- Next.js
- React Query
- Tailwind CSS

**Автентифікація**:
- JWT + Refresh токени

**Інфраструктура**:
- Docker + docker-compose

---

## 🚀 Запуск проекту локально

### 🔧 Клонування репозиторію
### Backend
- cd back-end
- yarn install
### Frontend
- cd ../front-end
- yarn install

### Backend (back-end/.env):
- PORT=4000
- DATABASE_URL=postgresql://postgres:password@localhost:5432/microchirp
- JWT_ACCESS_SECRET=your_access_secret_key
- JWT_REFRESH_SECRET=your_refresh_secret_key
- NODE_ENV=development

### Frontend (front-end/.env.local):
- NEXT_PUBLIC_API_URL=http://localhost:4000/api
- NODE_ENV=development

### Ініціалізація та запуск
- cd back-end
# Створюємо базу та застосовуємо міграції
- yarn db:create
- yarn migrate:latest

# Запускаємо сервер
- yarn dev

- 
### Frontend
- cd ../front-end
- yarn dev












