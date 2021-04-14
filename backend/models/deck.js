import Model from './model';

export default class Deck extends Model {
  async create() {
    const query = 'INSERT INTO Deck SET ?';
    const [results] = await Model.connection.query(query, this);
    this.deck_id = results.insertId;
  }

  static async addUser(deckId, userId) {
    const query = 'INSERT INTO UserDeck (user_id, deck_id) VALUES (?, ?)';
    await Model.connection.query(query, [userId, deckId]);
  }

  static async userDecks(userId) {
    const query = `SELECT
        Deck.*
        FROM Deck JOIN UserDeck ON Deck.deck_id = UserDeck.deck_id
        WHERE user_id = ?
      `;
    const [rows] = await Model.connection.query(query, [userId]);
    return rows.map((row) => new Deck(row));
  }

  static async getById(deckId) {
    const query = 'SELECT * FROM Deck WHERE deck_id = ?';
    const [rows] = await Model.connection.query(query, [deckId]);
    if (rows.length === 0) {
      return null;
    }
    return new Deck(rows[0]);
  }

  static async getByIdProtected(deckId, userId) {
    const query = `SELECT
    Deck.*
    FROM Deck JOIN UserDeck ON Deck.deck_id = UserDeck.deck_id
    WHERE user_id = ?
    AND Deck.deck_id = ?
  `;
    const [rows] = await Model.connection.query(query, [userId, deckId]);
    if (rows.length === 0) {
      return null;
    }
    return new Deck(rows[0]);
  }

  async delete() {
    const query = 'DELETE FROM Deck WHERE deck_id = ?';
    await Model.connection.query(query, [this.deck_id]);
  }
}
