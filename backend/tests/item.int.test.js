import User from '../models/user';
import Deck from '../models/deck';
import Item from '../models/item';

describe('Deck Model', () => {
  const randomUsername = Math.random().toString(36).substring(10);
  const user = new User({ username: randomUsername, password: 'bar' });
  const deck = new Deck({ name: 'Spanish' });
  const item = new Item({ question: 'hola', answer: 'hello' });

  beforeAll(async () => {
    await user.create();
    await deck.create();
    await Deck.addUser(deck.deck_id, user.user_id);
    item.deck_id = deck.deck_id;
  });

  test('Create Item', async () => {
    await item.create();
    expect(item.item_id).toBeTruthy();
    const [rows] = await Item.connection.query('SELECT * FROM UserItem');
    expect(rows.length).toBe(1);
    expect(rows[0].item_id).toBe(item.item_id);
    expect(rows[0].user_id).toBe(user.user_id);
  });

  test('Delete Item', async () => {
    await item.delete();
    let [rows] = await Item.connection.query('SELECT * FROM Item');
    expect(rows.length).toBe(0);
    [rows] = await Item.connection.query('SELECT * FROM UserItem');
    expect(rows.length).toBe(0);
  });

  afterAll(async () => {
    await user.delete();
    await deck.delete();
  });
});
