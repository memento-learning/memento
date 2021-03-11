import Model from './model';

export default class Deck extends Model {
  async create() {
    const query = 'INSERT INTO Deck SET ?';
    const [results] = await Model.connection.query(query, this);
    this.deck_id = results.insertId;
  }

  async addUser(userId) {
    await Deck.addUser(userId, this.deck_id);
  }

  static async addUser(userId, deckId) {
    const query = 'INSERT INTO UserDeck (user_id, deck_id) VALUES (?, ?)';
    await Model.connection.query(query, [userId, deckId]);
  }

  static async getUserDecks(userId) {
    const query = `SELECT 
        Deck.deck_id,
        name 
    FROM Deck INNER JOIN UserDeck ON
    Deck.deck_id = UserDeck.deck_id
    WHERE user_id = ?`;
    const [rows] = await Model.connection.query(query, [userId]);
  }
}
