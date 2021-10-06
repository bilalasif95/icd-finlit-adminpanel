# Makefile

docker-build:
	docker-compose up --build
docker-up:
	docker-compose up -d
docker-down:
	docker-compose down

.PHONY:  docker-build docker-up docker-down

