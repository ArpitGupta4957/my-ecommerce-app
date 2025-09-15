# Dockerfile for Orders Service
FROM node:20-alpine
WORKDIR /app
COPY ../../package*.json ./
COPY ../../yarn.lock ./
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build
CMD ["node", "dist/main.js"]
EXPOSE 3000
