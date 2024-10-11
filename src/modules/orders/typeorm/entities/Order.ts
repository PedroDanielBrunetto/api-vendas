import Customer from "@modules/customers/typeorm/entities/Customer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("customers")
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}

export default Order;
