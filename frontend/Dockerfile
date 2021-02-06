# pull official base image
FROM node:12.20.0

WORKDIR /app

COPY package*.json ./

RUN npm install

# add app
COPY . /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# start app
CMD ["npm", "start"]
