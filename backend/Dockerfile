# pull official base image
FROM node:12.20.0

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

# add app
COPY . /app

RUN chmod +x wait-for-it.sh

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# start app
CMD ["nodemon", "server"]
