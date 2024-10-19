import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";

interface IPaginationCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

class ListCustomerService {
  public async execute(): Promise<IPaginationCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const users = await customersRepository.createQueryBuilder().paginate();

    return users as IPaginationCustomer;
  }
}
export default ListCustomerService;
