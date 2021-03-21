### Helpful commands to build and run our services
build:
	docker-compose build
run:
	docker-compose up --build -d
down:
	docker-compose down --remove-orphans
migrate:
	docker-compose run --rm migrate
migrate-clean:
	docker-compose run --rm migrate flyway clean
mshell:
	docker-compose run --rm migrate bash
test: migrate-test
	docker-compose run --rm -e DB_USER=test -e DB_PASS=test -e DB_HOST=db -e DB_NAME=test backend yarn test
migrate-test: clean-test
	docker-compose run --rm -e DB_USER=test -e DB_PASS=test -e DB_HOST="jdbc:mysql://db:3306/test" migrate flyway migrate;
clean-test:
	docker-compose run --rm -e DB_USER=test -e DB_PASS=test -e DB_HOST="jdbc:mysql://db:3306/test" migrate flyway clean;
clear-db:
	rm -r ./db/data
lint:
	{\
		echo '\n-------Linting backend files-------';\
		docker-compose exec backend eslint "**/*.js" --ignore-pattern node_modules/;\
		echo '\n\n-------Linting frontend files-------';\
		docker-compose exec frontend eslint "**/*.js" --ignore-pattern node_modules/;\
	}
autofix:
	{\
		echo '\n-------Linting backend files-------';\
		docker-compose exec backend eslint "**/*.js" --ignore-pattern node_modules/ --fix;\
		echo '\n\n-------Linting frontend files-------';\
		docker-compose exec frontend eslint "**/*.js" --ignore-pattern node_modules/ --fix;\
	}
	
