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
mshell:
	docker-compose run migrate bash
lint:
	{\
		echo '\n-------Linting backend files-------';\
		backend/node_modules/.bin/eslint "backend/**/*.js" --ignore-pattern node_modules/;\
		echo '\n\n-------Linting frontend files-------';\
		frontend/node_modules/.bin/eslint "frontend/**/*.js" --ignore-pattern node_modules/;\
	}
autofix:
	{\
		echo '\n-------Linting backend files-------';\
		backend/node_modules/.bin/eslint "backend/**/*.js" --ignore-pattern node_modules/ --fix;\
		echo '\n\n-------Linting frontend files-------';\
		frontend/node_modules/.bin/eslint "frontend/**/*.js" --ignore-pattern node_modules/ --fix;\
	}
	
