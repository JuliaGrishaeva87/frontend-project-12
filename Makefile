install:
	npm ci

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

build:
	rm -rf frontend/dist
	npm run build

vite:
	npm run dev --prefix frontend
