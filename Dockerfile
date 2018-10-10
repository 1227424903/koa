FROM node:9.11.2
WORKDIR /app
COPY . /app/
EXPOSE 4000
RUN  npm install --registry=https://registry.npm.taobao.org
CMD ["npm", "start"] 