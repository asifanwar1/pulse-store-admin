// Validation messages for Zod schemas
export const EMAIL_REQUIRED = "Enter email address";
export const EMAIL_INVALID = "Enter a valid email address";
export const PASSWORD_REQUIRED = "Enter password";

export const PASSWORD_FORMAT =
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character";
export const TOKEN_REQUIRED = "Token is required";
export const CODE_REQUIRED = "Enter verification code";
export const CODE_MIN = "Verification code must be 4 digits";
export const CODE_MAX = "Verification code must be 4 digits";
export const CODE_FORMAT = "Enter a valid 4-digit code";
export const USER_TYPE_REQUIRED = "Select user type";
export const CONFIRM_PASSWORD_REQUIRED = "Confirm your password";
export const PASSWORDS_MATCH = "Passwords do not match";
export const LOGOUT_ERROR = "Logout failed";

// API response messages
export const LOGIN_SUCCESS = "Login successful!";
export const LOGIN_ERROR = "Login failed";
export const INVALID_LOGIN_DATA = "Invalid login data";
export const FORGOT_PASSWORD_ERROR = "Forget password failed";
export const INVALID_FORGOT_PASSWORD_DATA = "Invalid forget password data";
export const VERIFICATION_ERROR = "Verification failed";
export const INVALID_VERIFICATION_DATA = "Invalid verification data";
export const RESET_PASSWORD_ERROR = "Reset password failed";
export const INVALID_RESET_PASSWORD_DATA = "Invalid reset password data";
export const INVALID_RESPONSE_FORMAT = "Invalid response format";
export const GET_ME_ERROR = "Failed to get user data";
export const RESET_PASSWORD_SUCCESS_MESSAGE = "Password updated successfully!";

export const GENERIC_ERROR_MESSAGE = "Something went wrong";
export const NETWORK_ERROR_MESSAGE = "Network error occurred";
export const UNAUTHORIZED_ERROR_MESSAGE = "Unauthorized access";
