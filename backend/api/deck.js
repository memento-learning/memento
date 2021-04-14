import { Router } from 'express';
import isAuth from './middleware/isAuth';
import Deck from '../models/deck';
import DeckService from '../service/deck';

const router = Router();
router.use(isAuth);

router.get('/', async (req, res, next) => {
  try {
    const decks = await DeckService.getUserDecks(req.user);
    res.status(200).send(decks);
  } catch (err) {
    return next(err);
  }
  return next();
});

router.get('/:deckId(\\d+)', async (req, res, next) => {
  if (req.params.deckId) {
    try {
      const deck = await DeckService.getDeckById(req.params.deckId, req.user);
      res.status(200).send(deck);
    } catch (err) {
      res.sendStatus(403);
      return next(err);
    }
  }
  return next();
});

router.post('/create', async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw Error('Must specify deck name');
    }
    await DeckService.create(req.body.name, req.body.description, req.user);
    res.sendStatus(200);
    return next();
  } catch (err) {
    return next(err);
  }
});

export default router;
