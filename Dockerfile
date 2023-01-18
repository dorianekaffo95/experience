FROM node:14.17.0-alpine

# Copy application files
COPY ./build /usr/src/app
WORKDIR /usr/src/app

EXPOSE 443

ENV JWT_SECRET="Rent ALL"

ENV SITENAME="Visit My Cellar"

# Deepl
ENV DEEPL_AUTH_KEY=1b2fac03-b600-a641-caad-8550b179dbff:fx

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN apk add g++ make

# Install Yarn and Node.js dependencies
# RUN npm install yarn --global --no-progress --silent --depth 0 && \
#     yarn install --production --no-progress

RUN npm install --save --unsafe-perm node-sass@^4.5.0
RUN npm install --save babel-types
RUN npm install --save body-parser@^1.16.0
RUN npm install --save prop-types@^15.6.2 
RUN npm install

CMD [ "node", "server.js" ]
