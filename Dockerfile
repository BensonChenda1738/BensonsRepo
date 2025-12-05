# filepath: c:\Users\PC\Desktop\final project\Dockerfile
# Updated: Added notification routes and SMS gateway support
FROM node:18-alpine
WORKDIR /app
COPY finalApp/backend/package*.json ./
RUN npm install
COPY finalApp/backend/ ./
RUN npm run build
EXPOSE 5000
# Use node directly to avoid npm signal handling issues
CMD ["node", "dist/index.js"]
