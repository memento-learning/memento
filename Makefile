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
		cd backend && ./node_modules/.bin/eslint "**/*.js" --ignore-pattern node_modules/;\
		cd ..;\
		echo '\n\n-------Linting frontend files-------';\
		cd frontend && ./node_modules/.bin/eslint "**/*.js" --ignore-pattern node_modules/;\
	}
autofix:
	{\
		echo '\n-------Fixing backend files-------';\
		cd backend && ./node_modules/.bin/eslint "**/*.js" --ignore-pattern node_modules/ --fix;\
		cd ..;\
		echo '\n\n-------Fixing frontend files-------';\
		cd frontend && ./node_modules/.bin/eslint "**/*.js" --ignore-pattern node_modules/ --fix;\
	}
	
