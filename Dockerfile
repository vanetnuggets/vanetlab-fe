FROM node:19 AS build

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY . ./

RUN npm install
RUN npm run build

FROM nginx:latest

RUN echo "test"
ENV VITE_BE_API_URL="127.0.0.1:7777"

COPY --from=build /app/dist /usr/share/nginx/html
