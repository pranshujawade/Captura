/**
 * API request/response type definitions.
 * These define the contract surface for the future Flutter app.
 */

/** Standard API response envelope */
export interface ApiResponse<T> {
  data: T;
  meta: ApiMeta;
  errors: ApiError[];
}

export interface ApiMeta {
  version: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
}

/** Newsletter subscription */
export interface NewsletterSubscribeRequest {
  email: string;
}

export interface NewsletterSubscribeResponse {
  subscribed: boolean;
}

/** Health check */
export interface HealthCheckResponse {
  status: "ok";
  version: string;
}
