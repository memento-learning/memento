-- Table Schema Definitions
CREATE TABLE User(
    PRIMARY KEY (user_id),
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE,
    password CHAR(60)
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

-- Many to Many User Item with user specific item features for algorithim
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
