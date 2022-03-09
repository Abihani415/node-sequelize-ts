export const applicationJson = "application/json";
export const applicationXml = "application/xml";
export const API = "api";
export const POST = "POST";
export const GET = "GET";
export const PUT = "PUT";
export const DELETE = "DELETE";
export const PATCH = "PATCH";

export interface UserRegister {
  user_name: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserType {
  user_name?: string | undefined;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  password?: string | undefined;
}

export interface JwtError {
  name: string;
  message: string;
  expireAt: Date;
}

export interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
}

export interface FailedResponse<T = any> {
  success: false;
  message: string;
  data?: T;
}

export interface ValidationErrorResponse {
  success: false;
  message: string;
  error: string[];
}

export interface ErrorResponse<T = any> {
  success: false;
  message: string;
  error: T;
}
