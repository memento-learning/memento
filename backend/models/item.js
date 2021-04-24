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

  static async updateItems(items, deckId) {
    if (items.length === 0) { return; }
    const query = `
      INSERT INTO Item (item_id, deck_id, question, answer) VALUES 
      ?
      ON DUPLICATE KEY UPDATE item_id=VALUES(item_id), deck_id=VALUES(deck_id), question=VALUES(question), answer=VALUES(answer)
    `;
    await Model.connection.query(query,
      [items.map(({ item_id: itemId, question, answer }) => [itemId, deckId, question, answer])]);
  }

  static async insertItems(items, deckId) {
    if (items.length === 0) { return; }
    try {
      await Model.connection.beginTransaction();
      const itemQuery = 'INSERT INTO Item (deck_id, question, answer) VALUES ?';
      await Model.connection.query(itemQuery,
        [items.map(({ question, answer }) => [deckId, question, answer])]);
      const userItemQuery = `INSERT INTO UserItem (user_id, item_id)
        SELECT 
          UserDeck.user_id AS user_id,
          Item.item_id AS item_id
        FROM UserDeck INNER JOIN Item ON UserDeck.deck_id = Item.deck_id
        WHERE UserDeck.deck_id = ?
        ON DUPLICATE KEY UPDATE UserItem.user_id=UserDeck.user_id, UserItem.item_id=Item.item_id
        `;
      await Model.connection.query(userItemQuery, [deckId]);
      await Model.connection.commit();
    } catch (err) {
      await Model.connection.rollback();
      throw err;
    }
  }

  static async deleteItems(itemIds) {
    if (itemIds.length === 0) { return; }
    const query = 'DELETE FROM Item WHERE item_id IN (?)';
    await Model.connection.query(query, [itemIds]);
  }
}
