from mhart/alpine-node

workdir /usr/src/app

copy package* .

run npm install 

copy . .

expose 3000

cmd ["node", "index.js"]
