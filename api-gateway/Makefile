NAME = artoy_vault_api_gateway
VERSION = 1.0
CUR_DIR = $(shell basename $(CURDIR))
DOCKER_FILE ?= docker-compose.yml

.PHONY: start dev-up 

info:
	$(info CURRENT_BRANCH: $(CURRENT_BRANCH))
	$(info DOCKER_FILE: $(DOCKER_FILE))

dev-up:
	yarn start:dev

install-proto:
	yarn proto:install
	yarn proto:user
	
build:
	yarn build

bootstrap:
	cp .env.example .env
	yarn
	yarn proto:install
	yarn proto:all

