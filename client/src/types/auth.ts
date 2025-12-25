export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    _id: string;
    name: string;
    email: string;
  }
  