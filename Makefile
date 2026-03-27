.PHONY: up down status psql fresh analyze logs

# Start full stack
up:
	docker compose up -d --build
	sleep 15

# Status check
status:
	docker compose ps
	@echo "\n🌐 URLs:"
	@echo "FastAPI: http://localhost:8000/docs"
	@echo "pgAdmin: http://localhost:5050"
	@echo "Jupyter: $$(docker compose logs jupyter 2>&1 | grep token | tail -1)"
	@echo "Postgres: localhost:5432"

# Fresh data pipeline
fresh:
	make ingest
	make dbt
	curl -s localhost:8000/api/traffic/summary | jq '.[0]'

# Data ingestion
ingest:
	python ingest_ckan.py

# dbt pipeline
dbt:
	dbt run

# psql
psql:
	docker exec -it $$(docker ps -qf name=postgres) psql -U postgres -d observatory

# Jupyter analysis starter
analyze:
	docker compose exec jupyter bash -c "pip install plotly pandas && echo '✅ Analysis env ready'"

# Logs
logs:
	docker compose logs -f fastapi

# Clean restart
reset:
	make down
	docker volume rm data-observatory_postgres_data || true
	make up
	make fresh
