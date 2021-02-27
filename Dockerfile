FROM node:14-alpine

# Create app directory
WORKDIR /app
#copy package(lock).json
COPY package*.json ./
#install git (needed in alpine for git repos)
RUN apk add git
#install packages
RUN npm ci --only=production
# Bundle app source
COPY . .

EXPOSE 80

CMD [ "npm", "start" ]
