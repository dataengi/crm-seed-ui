FROM node:8-alpine

COPY package.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

ENV SERVER_ADDRESS 'http://localhost:9000'

RUN chmod +x docker/dev/entrypoint.sh

ENTRYPOINT ["./docker/dev/entrypoint.sh"]
