# frontend/Dockerfile
FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# NGINX для serve production build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
