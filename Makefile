.PHONY: up down connect status

up:
	docker compose up -d

down:
	docker compose down

connect:
	docker exec -it data-observatory-postgres-1 psql -U postgres -d observatory

status:
	docker compose ps
