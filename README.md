# Memento

Memento is a program which makes remembering things easy. Using unique learning methods memento enables users to greatly decrease their time spent studying, and greatly increase the amount they learn.

## Dev Setup

1. Download and install Docker https://www.docker.com/products/docker-desktop
2. Make sure you specify a .env file, pull it from Teams or make your own. See env file definition below.
3. Run `make build` and verify that the files have built properly.
4. Run `make run`
5. You should see a react splash page @ http://localhost:3000 if everything worked
6. Run `docker logs -f <service_name>` to stream logs from a specific service
7. Run `make down` to stop services

## Dev Structure
Currently the project runs multiple docker environments for each 'service'. We have the frontend, backend, database, and migration service. The frontend service has the ui, backened has node code, and the migration service inits the schemas and data to our database.

## Database Migrations
We have chosen to use a migration service called flyway to version our schemas and migrations. Read more about migrations here: https://flywaydb.org/documentation/getstarted/why

If you make any changes to the database files, run `make migrate-clean` and then `make migrate`. Currently the local database will persist. So when you merge new database changes you apply the migrate or must clean the database and then migrate again.

## Linting
To lint your files, make sure you run npm install in each backend and frontend directory. Then run `make lint`, and `make autofix` to lint and fix code formatting.