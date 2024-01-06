FROM node:16-alpine

EXPOSE 3000

WORKDIR /app/front-end

COPY . .

ADD ./node_modules.tar.gz  ./


ENTRYPOINT [ "npm" ]

CMD [ "start" ]
