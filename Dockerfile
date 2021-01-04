FROM node:12

ENV NODE_ENV=development

ENV PORT=3000

ENV DATABASE_LOCAL = mongodb://0.0.0.0:27020/natours?authSource=admin

COPY . .

CMD [ "npm", "start" ]

