import { Request, Response } from "express"
import HttpError from "../helpers/httpError"
import { createChirp, deleteChirp, updateChirp, getAllChirps, getChirpById, getPrivateChirps } from "../services/chirps.service"
import { AuthenticatedRequest } from "../../middleware/authenticate"
import ctrlWrapper from "../decorators/ctrlWrapper"

export const create = async (req: AuthenticatedRequest, res: Response) => {
    const { content } = req.body;
    if (!content) {
        throw HttpError(400, 'Content is required');
    }

    const chirp = await createChirp(req.user!.id, content)
    res.status(201).json(chirp);
}

export const getAll = async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    if (limit > 100) {
        throw HttpError(400, 'Limit should be <= 100');
    }

    const chirps = await getAllChirps(limit, offset);
    res.json(chirps);
}

export const getMyChirps = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user
    if (!user) {
        throw HttpError(401, 'Not authenticated');
    }
    const chirps = await getPrivateChirps(Number(user.id))
    res.json(chirps)

}

export const getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const chirp = await getChirpById(id);
    if (!chirp) {
        throw HttpError(404, 'Chirp not found');
    }
    res.json(chirp)
}

export const remove = async (req: AuthenticatedRequest, res: Response) => {
    const id = Number(req.params.id);
    const deleted = await deleteChirp(id, req.user!.id)
    if (!deleted) {
        throw HttpError(404, "Chirp not found or you're not the owner");
    }
    res.status(200).json({ message: 'Chirp deleted successfully' });
}

export const update = async (req: AuthenticatedRequest, res: Response) => {
    const id = Number(req.params.id);
    const { content } = req.body;
    if (!content) {
        throw HttpError(400, 'Content is required');
    }

    const updated = await updateChirp(id, content)
    if (!updated) {
      throw HttpError(404, "Chirp not found or you're not the owner");
    }
    res.json(updated);
}

export default {
  create: ctrlWrapper(create),
  getAll: ctrlWrapper(getAll),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  getById: ctrlWrapper(getById),
  getMyChirps: ctrlWrapper(getMyChirps),
};