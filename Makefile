start:
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml up

# Path: Makefile
stop:
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml down

# Path: Makefile
restart:
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml restart

# Path: Makefile
build:
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml build

# Path: Makefile
shell:
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml exec phantom-x-bot sh

# Path: Makefile
editable:
	@sudo chown ${USER}:${USER} ./*

install:
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml run --rm phantom-x-bot npm install

lint:
	@docker-compose -f docker-compose.yml run --rm phantom-x-bot npm run lint

test:
	@docker-compose -f docker-compose.yml -f docker-compose.test.yml run --rm phantom-x-bot npm test $(FILE)

.PHONY: ci
ci: lint test