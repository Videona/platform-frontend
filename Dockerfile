# vim:set ft=dockerfile:
FROM node:7
RUN mkdir -p /app/src
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ARG NODE_ENV
ARG BACKEND_API_URL
ARG FRONTEND_HOST
ARG FRONTEND_PORT
ARG FLAVOUR
COPY package*.json /app/
#COPY gulpfile.js /app
RUN npm install
COPY . /app/src
RUN node_modules/gulp/bin/gulp.js build --gulpfile src/gulpfile.js
CMD npm start
EXPOSE 8080
