NAME = artoy_vault
VERSION = 1.0
CUR_DIR = $(shell basename $(CURDIR))
DOCKER_FILE ?= docker-compose.yml

.PHONY: start dev_up dbmigrate

info:
	$(info CURRENT_BRANCH: $(CURRENT_BRANCH))
	$(info DOCKER_FILE: $(DOCKER_FILE))

dev_up:
	docker compose -f $(DOCKER_FILE) up -d --remove-orphans --force-recreate
	yarn watch:dev

down:
	docker compose -f $(DOCKER_FILE) down
	
debug:
	yarn debug:dev

build:
	yarn build

bootstrap:
	cp .env.example .env
	yarn

dbmigrate-generate:
	yarn migration:create src/database/migrations/${name}

dbmigrate:
	yarn migration:run

dbmigrate-down:
	yarn migration:revert

fork-kill-dev:
    lsof -t -i tcp:3000 | xargs kill
