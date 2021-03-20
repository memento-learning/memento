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
  async delete(){
    const itemQuery = 'DELETE FROM Item WHERE item_id = ?';
    await Model.connection.query(itemQuery, [this.item_id]);
  }
}
