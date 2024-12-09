// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// User Types
export interface User {
  id: number;
  username: string;
  email: string;
}

// Auth Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Product Types
export interface Product {
  id: number;
  data_category: string;
  record_count: number;
  fields: string;
}

// API Error Type
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
