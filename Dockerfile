# pull official base image
FROM node:12.20.0

# set working directory
WORKDIR /app

# add app
COPY . /app

# install app dependencies
RUN npm install
RUN cd /app/backend
RUN npm install
RUN npm install -g nodemon
RUN cd ..

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# start app
CMD ["npm", "start"]
