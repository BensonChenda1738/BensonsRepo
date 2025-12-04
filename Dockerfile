# filepath: c:\Users\PC\Desktop\final project\Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY finalApp/backend/package*.json ./
RUN npm install
COPY finalApp/backend/ ./
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
