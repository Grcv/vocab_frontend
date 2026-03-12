FROM node:20-alpine AS builder

WORKDIR /app_pronuncia/pronuncia_frontend/
COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app_pronuncia/pronuncia_frontend/dist/vocab-app/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]