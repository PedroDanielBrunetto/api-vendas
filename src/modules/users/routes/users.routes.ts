import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import uploadConfig from "@config/upload";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

//configuração para o upload
const upload = multer(uploadConfig);

usersRouter.get("/", isAuthenticated, usersController.index);
usersRouter.post(
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
      password: Joi.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
      }),
    },
  }),
  usersController.create
);

//single é para enviar um único arquivo, mais de um seria array
usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  usersAvatarController.update
);

export default usersRouter;
