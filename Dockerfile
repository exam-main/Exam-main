
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma
COPY . .

RUN npx prisma generate
RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY . .

RUN npx prisma generate

# 🧠 Xotirani kengaytiramiz
ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app .

RUN npm install --production

CMD ["node", "dist/main"]

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma


EXPOSE 3000

CMD ["node", "dist/main"]
