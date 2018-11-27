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
ARG MAIN_COLOR
ARG MAX_VIDEO_UPLOAD_BYTE_SIZE
ARG GMAPS_API_KEY
ARG MIXPANEL_API_KEY
ARG OPEN_GALLERY
ARG DRIFT_KEY
ARG DRIFT_SNIPPET_VERSION
# Auth0 args
ARG AUTH0_CLIENT_ID
ARG AUTH0_DOMAIN
ARG AUTH0_AUDIENCE
ARG AUTH0_REDIRECT_URI
ARG AUTH0_SCOPE
ARG AUTH0_METADATA_NS
COPY package*.json /app/
#COPY gulpfile.js /app
RUN npm install
COPY . /app/src
RUN node_modules/gulp/bin/gulp.js build --gulpfile src/gulpfile.js
CMD npm start
EXPOSE 8080
