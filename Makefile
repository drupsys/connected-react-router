.DEFAULT_GOAL := go

.PHONY: go
go: down up

.PHONY: build
build: down rebuild up

.PHONY: rebuild
rebuild:
	docker-compose build --pull

.PHONY: up
up:
	docker-compose up -d --remove-orphans

.PHONY: down
down:
	docker-compose down

.PHONY: shell
shell:
	docker exec -it servicer sh

.PHONY: logs
logs:
	docker-compose logs -f --tail=100

.PHONY: test
test:
	docker exec -it servicer npm test -- -t "$(filter)"

.PHONY: publish
publish:
	npm run build && npm test 
	npm version $(kind)
	cp ./package.json ./dist
	npm publish ./dist && rm -fr ./dist
	git push && git push --tags
