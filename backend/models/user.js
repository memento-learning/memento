import Model from './model';

export default class User extends Model {
  async create() {
    const query = 'INSERT INTO User SET ?';
    const [results] = await Model.connection.query(query, this);
    this.user_id = results.insertId;
  }

  static async getOne() {
    const [rows] = await Model.connection.query('SELECT * FROM User LIMIT 1');
    if (rows.length === 0) {
      return null;
    }
    return new User(rows[0]);
  }

  static async getByUsername(username) {
    const query = 'SELECT * FROM User WHERE username = ?';
    const [rows] = await Model.connection.query(query, [username]);
    if (rows.length === 0) {
      return null;
    }
    return new User(rows[0]);
  }

  static async getById(id) {
    const query = 'SELECT * FROM User WHERE user_id = ?';
    const [rows] = await Model.connection.query(query, [id]);
    if (rows.length === 0) {
      return null;
    }
    return new User(rows[0]);
  }

  async delete() {
    const query = 'DELETE FROM User WHERE user_id = ?';
    await Model.connection.query(query, [this.user_id]);
  }
}
