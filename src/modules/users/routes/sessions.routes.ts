import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionsController from "../controllers/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be valid",
      }),
      password: Joi.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
      }),
    },
  }),
  sessionsController.create
);

export default sessionsRouter;
