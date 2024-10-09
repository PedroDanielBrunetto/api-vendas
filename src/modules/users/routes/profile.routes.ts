import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get("/", profileController.show);

profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
      }),
      email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be valid",
      }),
      password: Joi.string().optional().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
      }),
      password_confirmation: Joi.string()
        .valid(Joi.ref("password"))
        .when("passoword", {
          is: Joi.exist(),
          then: Joi.required(),
        }),
      old_password: Joi.string().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
      }),
    },
  }),
  profileController.update
);

export default profileRouter;
