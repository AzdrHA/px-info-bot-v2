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
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml run --rm phantom-x-bot sh

# Path: Makefile
editable:
	@sudo chown ${USER}:${USER} ./*

install:
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml run --rm phantom-x-bot npm install

lint:
	@docker-compose -f docker-compose.yml run --rm phantom-x-bot npm run lint

test:
	@docker-compose -f docker-compose.yml -f docker-compose.test.yml run --rm phantom-x-bot npm test $(FILE)

sonar:
	sonar-scanner   -Dsonar.projectKey=PhantomX-Bot   -Dsonar.sources=.   -Dsonar.host.url=http://localhost:9000   -Dsonar.login=sqp_5eefb9c7749881a1123750ea1f876fd2a572c2a6

test-coverage:
	@docker-compose -f docker-compose.yml -f docker-compose.test.yml run --rm phantom-x-bot npm run test:coverage $(FILE)

.PHONY: ci
ci: lint test sonar