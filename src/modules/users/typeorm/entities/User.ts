import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude() // Garante que a classe não retorne dados sensíveis.
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @Expose({ name: "avatar_url" }) // Nome que será usado no retorno da classe.
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;

    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }
}

export default User;
