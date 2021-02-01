### Helpful commands to build and run our services
build:
	docker build -t memento:dev .
run:
	docker-compose up --build
down:
	docker-compose down
