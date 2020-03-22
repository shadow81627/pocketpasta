# build stage
FROM node:12 as build-stage
WORKDIR /app
ENV PORT 8080
ENV HOST 0.0.0.0
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:modern
CMD ["npm" "start"]
