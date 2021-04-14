import Deck from '../models/deck';

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
      return deck;
    }
  }
}

export default DeckService;
