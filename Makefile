### Helpful commands to build and run our services
build:
	docker-compose build
run:
	docker-compose up --build -d
down:
	docker-compose down --remove-orphans
migrate:
	docker-compose run migrate
migrate-clean:
	docker-compose run migrate flyway clean
