import User from '../models/user';
import Deck from '../models/deck';

describe('Deck Model', () => {
  const user = new User({ username: 'foo', password: 'bar' });
  const deck = new Deck({ name: 'Spanish' });

  test('Deck Create', async () => {
    await deck.create();
    expect(deck.deck_id).toBeTruthy();
  });

  test('Add User to Deck', async () => {
    await user.create();
    const userId = user.user_id;
    Deck.addUser(deck.deck_id, userId);
    const decks = await Deck.userDecks(userId);
    expect(decks[0].deck_id).toEqual(deck.deck_id);
  });

  test('Delete Deck', async () => {
    await deck.delete();
    const sameDeck = await Deck.getById(deck.deck_id);
    const sameUser = await User.getById(user.user_id);
    expect(sameDeck).toBeFalsy();
    expect(sameUser).toBeTruthy();
    const [rows] = await Deck.connection.query('SELECT * FROM UserDeck');
    expect(rows.length).toBe(0);
  });

  afterAll(async () => {
    await user.delete();
    await deck.delete();
  });
});
