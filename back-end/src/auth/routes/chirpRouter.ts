import express from 'express';

import { remove, create, update, getAll, getById, getMyChirps } from '../controllers/chirps.controller';
import authenticate from '../../middleware/authenticate';


const chirpRouter = express.Router();

chirpRouter.get('/', getAll);


chirpRouter.get('/my', authenticate, getMyChirps);

chirpRouter.get('/:id', getById);

chirpRouter.post("/", authenticate, create)
chirpRouter.delete("/:id", authenticate, remove)
chirpRouter.put("/:id", authenticate, update)

export default chirpRouter;