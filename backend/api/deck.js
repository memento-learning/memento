import { Router } from 'express';
import isAuth from './middleware/isAuth';
import Deck from '../models/deck';

const router = Router();
router.use(isAuth);

router.get('/', async (req, res, next) => {
  try {
    const decks = await Deck.userDecks(req.user.user_id);
    res.status(200).send(decks);
    return next();
  } catch (err) {
    return next(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw Error('Must specify deck name');
    }
    const deck = new Deck({ name: req.body.name, description: req.body.description });
    await deck.create();
    await Deck.addUser(deck.deck_id, req.user.user_id);
    res.sendStatus(200);
    return next();
  } catch (err) {
    return next(err);
  }
});
export default router;
