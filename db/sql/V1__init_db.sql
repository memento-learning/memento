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
    num_reviewed INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (item_id) REFERENCES Item(item_id),
    UNIQUE (user_id, item_id)
);

INSERT INTO User (username, password)
VALUES ('gathass', 'iamgathass');

INSERT INTO Deck (name)
VALUES ('spanish');

INSERT INTO UserDeck (user_id, deck_id)
VALUES (1, 1);