
FROM node:23 AS build

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

ARG VITE_API_GATEWAY
ARG VITE_RABBITMQ_URL
ARG VITE_RABBITMQ_VHOST
ARG VITE_RABBITMQ_USERNAME
ARG VITE_RABBITMQ_PASSWORD
ARG VITE_KEYCLOAK_URL
ARG VITE_KEYCLOAK_REALM
ARG VITE_KEYCLOAK_CLIENT_ID
ARG VITE_KEYCLOAK_RESOURCE_CLIENT
ARG VITE_KEYCLOAK_RESOURCE_CLIENT_ID

ENV VITE_API_GATEWAY=$VITE_API_GATEWAY
ENV VITE_RABBITMQ_URL=$VITE_RABBITMQ_URL
ENV VITE_RABBITMQ_VHOST=$VITE_RABBITMQ_VHOST
ENV VITE_RABBITMQ_USERNAME=$VITE_RABBITMQ_USERNAME
ENV VITE_RABBITMQ_PASSWORD=$VITE_RABBITMQ_PASSWORD
ENV VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL
ENV VITE_KEYCLOAK_REALM=$VITE_KEYCLOAK_REALM
ENV VITE_KEYCLOAK_CLIENT_ID=$VITE_KEYCLOAK_CLIENT_ID
ENV VITE_KEYCLOAK_RESOURCE_CLIENT=$VITE_KEYCLOAK_RESOURCE_CLIENT
ENV VITE_KEYCLOAK_RESOURCE_CLIENT_ID=$VITE_KEYCLOAK_RESOURCE_CLIENT_ID

RUN npm run build

FROM nginx:1.27.5 AS prod

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
