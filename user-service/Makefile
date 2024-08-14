NAME = artoy_vault
VERSION = 1.0
CUR_DIR = $(shell basename $(CURDIR))
DOCKER_FILE ?= docker-compose.yml

.PHONY: start dev-up create-migrate

ifeq (create-migrate,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  MIGRATION_NAME := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(MIGRATION_NAME):;@:)
endif


info:
	$(info CURRENT_BRANCH: $(CURRENT_BRANCH))
	$(info DOCKER_FILE: $(DOCKER_FILE))

dev-up:
	yarn watch:dev

up:
	docker compose -f $(DOCKER_FILE) up -d --remove-orphans --force-recreate

down:
	docker compose -f $(DOCKER_FILE) down
	
debug:
	yarn debug:dev

build:
	yarn build

bootstrap:
	cp .env.example .env
	yarn

create-migrate:
	yarn migration:create src/database/migrations/${MIGRATION_NAME}

up-migrate:
	yarn migration:run

down-migrate:
	yarn migration:revert

fork-kill-dev:
    lsof -t -i tcp:3000 | xargs kill
