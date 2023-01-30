FROM node:14.19-alpine3.14 as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14.19-alpine3.14 as runner
RUN apk add -U tzdata
ENV TZ=America/Santiago
RUN cp /usr/share/zoneinfo/America/Santiago /etc/localtime
RUN echo "Asia/Yangon" >  /etc/timezone
RUN date
WORKDIR /app
COPY --from=builder /app/package.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
CMD ["npm", "run", "start:prod"]
