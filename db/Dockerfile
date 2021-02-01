# pull official base image
FROM flyway/flyway

COPY *.sql /flyway/sql/
COPY flyway.conf /flyway/conf/
COPY ./wait-for-it.sh ./

ENTRYPOINT []
CMD ["flyway", "migrate"]