# 1. Build Angular
FROM node:20-alpine AS builder

WORKDIR /app/pronuncia_frontend/
COPY . .

RUN npm install


RUN npm run build --prod

# 2. Servidor nginx
FROM nginx:alpine

COPY --from=builder /app/pronuncia_frontend/dist/vocab_app/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]