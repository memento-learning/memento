# pull official base image
FROM flyway/flyway

COPY ./sql/*.sql /flyway/sql/
COPY ./conf/flyway.conf /flyway/conf/
COPY ./wait-for-it.sh ./

ENTRYPOINT []
CMD ["flyway", "migrate"]