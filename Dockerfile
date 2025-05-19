FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json .
COPY src ./src

RUN mkdir -p dist/src && \
    npm run build && \
    ls -la dist/src

RUN rm -rf node_modules && \
    npm ci --only=production

CMD ["node", "dist/src/index.js"] 