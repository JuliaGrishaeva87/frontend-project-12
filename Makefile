install:
	npm ci

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

build:
	npx -y pnpm@10.34.5 --dir frontend run build

vite:
	npm run dev --prefix frontend
