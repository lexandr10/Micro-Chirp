Micro-Chirp
Невеликий додаток «мікроблог» (Node.js + PostgreSQL + Next.js).
Дозволяє реєструватися, входити в систему, публікувати «chirps» та дивитися стрічку.

Технології
Backend: Node.js, Express, Knex.js, PostgreSQL

Frontend: Next.js, React Query, Tailwind CSS

Автентифікація: JWT + Refresh токени

Складання: Docker + docker-compose

Запуск проекту локально
Клонуємо репозиторій

git clone https://github.com/yourusername/micro-chirp.git
cd micro-chirp
 
 Завантаження заложностей 
 cd back-end
yarn install

cd ../front-end
yarn install


Налаштовуємо змінні оточення
Для backend (back-end/.env):

PORT=4000
DATABASE_URL=postgresql://postgres:password@localhost:5432/microchirp
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
NODE_ENV=development


Для frontend (front-end/.env.local):

NEXT_PUBLIC_API_URL=http://localhost:4000/api
NODE_ENV=development


Запускаємо БД (PostgreSQL)
Можна поставити локально pgAdmin або через docker:

Docker: docker-compose up --build - відразу все запуститься 


Для локального запуску backend: 

cd back-end
# Створюємо базу та міграції
yarn db:create
yarn migrate:latest

yarn dev

Для локального запуску frontend:

cd ../front-end
yarn dev









