# pull official base image
FROM node:12.20.0

RUN mkdir /tmp/react
RUN mkdir /tmp/backend

COPY package*.json /tmp/react/
COPY package*.json /tmp/backend/

# global dependencies
RUN npm install -g nodemon

# project dependencies
RUN cd /tmp/react && npm install
RUN cd /tmp/backend && npm install

# set working directory
WORKDIR /app

# add app
COPY . /app

# Symlink node modules

RUN ln -s /tmp/react/node_modules ./node_modules
RUN ln -s /tmp/react/node_modules ./backend/node_modules

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# start app
CMD ["npm", "start"]
