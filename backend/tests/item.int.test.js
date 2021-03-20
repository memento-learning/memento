import User from '../models/user';
import Deck from '../models/deck';
import Item from '../models/item';
import { async } from 'regenerator-runtime';

describe('Deck Model', () => {
  const user = new User({ username: 'foo', password: 'bar' });
  const deck = new Deck({ name: 'Spanish' });
  const item = new Item({question: 'hola', answer:'hello'});
  beforeAll(async()=> {
    await user.create();
    await deck.create();
    await Deck.addUser(deck.deck_id, user.user_id);
    item.deck_id = deck.deck_id;
  } );

  test('Create Item', async () => {
    await item.create();
    expect(item.item_id).toBeTruthy();
    const [rows] = await Item.connection.query('SELECT * FROM UserItem');
    expect(rows.length).toBe(1);
  });

});
