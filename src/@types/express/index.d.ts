//override de um tipo existente
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    file: {
      filename: string;
    };
  }
}
