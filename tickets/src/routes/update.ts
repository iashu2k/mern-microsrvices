import {
  requireAuth,
  validationRequest,
  NotFoundError,
  NotAuthError,
} from "@tickethub1/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than zero"),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    const { title, price } = req.body;
    if (!ticket) {
      throw new NotFoundError();
    }
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthError();
    }

    ticket.set({
      title,
      price,
    });
    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
