-- Table Schema Definitions
CREATE TABLE User(
    PRIMARY KEY (user_id),
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20),
    password VARCHAR(20)
);

CREATE TABLE Deck (
    PRIMARY KEY(deck_id),
    deck_id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(20)
);

CREATE TABLE UserDeck (
    user_id INT NOT NULL,
    deck_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (deck_id) REFERENCES Deck(deck_id),
    UNIQUE (user_id, deck_id)
);

CREATE TABLE Item (
    PRIMARY KEY(item_id),
    item_id INT NOT NULL AUTO_INCREMENT,
    deck_id INT NOT NULL,
    FOREIGN KEY (deck_id) REFERENCES Deck(deck_id),
    question VARCHAR(100),
    answer VARCHAR(100)
);

CREATE TABLE UserItem (
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    num_repetitions INT DEFAULT 0,
    easiness FLOAT  DEFAULT 2.5,
    rep_interval FLOAT DEFAULT 1.0,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (item_id) REFERENCES Item(item_id),
    UNIQUE (user_id, item_id)
);

-- Dummy Data Insertion
INSERT INTO User (username, password)
VALUES ('gathass', 'iamgathass');
SET @dummy_user_id = LAST_INSERT_ID();

INSERT INTO Deck (name)
VALUES ('spanish');
SET @dummy_deck_id = LAST_INSERT_ID();

INSERT INTO UserDeck (user_id, deck_id)
VALUES (@dummy_user_id , @dummy_deck_id);

INSERT INTO Item (deck_id, question, answer)
VALUES 
    (@dummy_deck_id, 'hola', 'hello'),
    (@dummy_deck_id, 'mundo', 'world');

INSERT INTO UserItem(user_id, item_id)
SELECT 
    @dummy_user_id, 
    item_id
FROM Item
WHERE deck_id = @dummy_deck_id;