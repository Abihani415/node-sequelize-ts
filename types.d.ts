declare namespace Express {
  export interface Request {
    user: any;
  }
  export interface Response {
    user: any;
  }
  export interface JwtPayload {
    data: any;
  }
}
