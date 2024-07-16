# Использование базового образа Node.js 16
FROM node:16-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода в рабочую директорию
COPY . .

# Команда по умолчанию для запуска вашего приложения
CMD ["npm", "run", "start:dev"]
