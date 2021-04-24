import Deck from '../models/deck';
import Item from '../models/item';

class DeckService {
  static async create(name, description, user) {
    const deck = new Deck({ name, description });
    await deck.create();
    await Deck.addUser(deck.deck_id, user.user_id);
  }

  static async getUserDecks(user) {
    const decks = await Deck.userDecks(user.user_id);
    return decks;
  }

  static async getDeckById(deckId, user) {
    const deck = await Deck.getByIdProtected(deckId, user.user_id);
    if (!deck) {
      const checkDeckExists = await Deck.getById(deckId);
      if (checkDeckExists) {
        throw Error('You do not have access to this deck.');
      }
      throw Error('This deck does not exist.');
    } else {
      const items = await Item.getDeckItems(deck.deck_id);
      return { ...deck, items };
    }
  }

  static async editDeckItems(deckId, items, deleted) {
    const insertItems = items.filter(({ item_id: itemId }) => !itemId);
    const updateItems = items.filter(({ item_id: itemId }) => itemId);
    const insert = Item.insertItems(insertItems, deckId);
    const update = Item.updateItems(updateItems, deckId);
    const del = Item.deleteItems(deleted);
    await insert;
    await update;
    await del;
  }
}

export default DeckService;
