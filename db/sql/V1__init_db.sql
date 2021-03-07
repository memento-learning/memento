-- Table Schema Definitions
CREATE TABLE User(
    PRIMARY KEY (user_id),
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20),
    password VARCHAR(20)
);

INSERT INTO test
VALUES (0, 'hello knookles from the database');
