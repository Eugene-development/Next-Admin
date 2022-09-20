FROM node:16.14.0
ENV APP_ROOT /app

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD ./app ${APP_ROOT}

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
