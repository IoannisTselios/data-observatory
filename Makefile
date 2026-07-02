.PHONY: up down status psql fresh analyze logs reset frontend frontend-build api-test check validate-catalog

PYTHON ?= ./venv/bin/python
DBT ?= ./venv/bin/dbt

up:
	docker compose up -d --build
	sleep 15

down:
	docker compose down

status:
	docker compose ps
	@echo "\n🌐 URLs:"
	@echo "FastAPI: http://localhost:8000/docs"
	@echo "pgAdmin: http://localhost:5050"
	@echo "Postgres: localhost:5432"

frontend:
	cd data-observatory-frontend && npm run dev

frontend-build:
	cd data-observatory-frontend && npm run build

api-test:
	curl -s localhost:8000/api/traffic/summary | head

check:
	make status
	@echo "\n🔎 FastAPI docs:"
	@curl -I http://localhost:8000/docs || true
	@echo "\n🔎 Traffic endpoint:"
	@curl -s localhost:8000/api/traffic/summary | head || true

validate-catalog:
	$(PYTHON) catalog/validate_catalog.py

fresh:
	make ingest
	make dbt
	curl -s localhost:8000/api/traffic/summary | jq '.[0]'

ingest:
	$(PYTHON) pipelines/ingest_ckan_cph.py

ingest-next4:
	$(PYTHON) -m pipelines.ingestion.cph_bicycle_data
	$(PYTHON) -m pipelines.ingestion.cph_parking_counts
	$(PYTHON) -m pipelines.ingestion.cph_airview
	$(PYTHON) -m pipelines.ingestion.cph_tree_base

.PHONY: dbt
dbt:
	$(DBT) run --project-dir dbt/observatory

psql:
	docker exec -it $$(docker ps -qf name=postgres) psql -U postgres -d observatory

analyze:
	docker compose exec jupyter bash -c "pip install plotly pandas && echo '✅ Analysis env ready'"

logs:
	docker compose logs -f fastapi

reset:
	make down
	docker volume rm data-observatory_postgres_data || true
	make up
	make fresh
