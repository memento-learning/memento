import Model from './model';

export default class Item extends Model {
  async create() {
    try {
      await Model.connection.beginTransaction();
      const itemQuery = 'INSERT INTO Item SET ?';
      const [results] = await Model.connection.query(itemQuery, this);
      this.item_id = results.insertId;
      const userItemQuery = `INSERT INTO UserItem (user_id, item_id)
        SELECT 
            user_id,
            ? AS item_id
        FROM UserDeck 
        WHERE deck_id = ?
        `;
      await Model.connection.query(userItemQuery, [this.item_id, this.deck_id]);
      await Model.connection.commit();
    } catch (err) {
      await Model.connection.rollback();
      throw err;
    }
  }

  static async getDeckItems(deckId) {
    const query = 'SELECT * FROM Item WHERE deck_id = ?';
    const [rows] = await Model.connection.query(query, [deckId]);
    return rows.map((row) => new Item(row));
  }

  async delete() {
    const query = 'DELETE FROM Item WHERE item_id = ?';
    await Model.connection.query(query, [this.item_id]);
  }
}
