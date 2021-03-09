# pull official base image
FROM node:12.20.0

WORKDIR /app

RUN yarn global add nodemon

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# add app
COPY . /app

RUN chmod +x wait-for-it.sh

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# start app
CMD ["nodemon", "--exec", "babel-node", "server.js"]
