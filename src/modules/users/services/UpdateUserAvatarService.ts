import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UserRepository";
import path from "path";
import uploadConfig from "@config/upload";
import DiskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";
import fs from "fs";
import S3StorageProvider from "@shared/providers/StorageProvider/S3StorageProvider";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    if (uploadConfig.driver === "s3") {
      const storageProvider = new S3StorageProvider();
      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      const fileName = await storageProvider.saveFile(avatarFilename);
      user.avatar = fileName;
    } else {
      const storageProvider = new DiskStorageProvider();
      const fileName = await storageProvider.saveFile(avatarFilename);

      user.avatar = fileName;
    }

    await userRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
