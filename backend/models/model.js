export default class Model {
  static connection;

  constructor(fields) {
    this.serialize(fields);
  }

  static setConnection(connection) {
    Model.connection = connection;
  }

  serialize(obj) {
    return Object.assign(this, obj);
  }
}
