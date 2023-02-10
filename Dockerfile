FROM node:18-alphine
RUN mkdir -p /home/node/app/node_moludes && chow -R node:node /home/node/app
WORKDIR     /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node
EXPOSE 3000
CMD ["node", "server.ts"]