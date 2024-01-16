import {
  Auth0Error,
  Auth0UserProfile,
  ChangePasswordOptions,
  DbSignUpOptions,
  LoginOptions,
} from "auth0-js";

export interface ErrorObject {
  code?: string;
  description?:
    | string
    | {
        verified: boolean;
        rules: any[];
      };
  statusCode?: number;
}
export interface signupOptions extends DbSignUpOptions {
  family_name?: string;
  given_name?: string;
  name: string;
}

export interface UserAuthTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
  user: Auth0UserProfile;
}

export interface LoginResult extends ErrorObject {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SignupResult extends Auth0UserProfile, ErrorObject {}
export interface userDetailResult extends Auth0UserProfile, ErrorObject {}
export interface resetPasswordResult extends Auth0UserProfile, ErrorObject {}
export interface userProfileResult extends Auth0UserProfile, ErrorObject {}

export interface AuthTypes {
  /**
   * Authenticates user with email and password.
   * @param opts - Object with user's email, password.
   * @returns Promise resolved with user data or undefined.
   */
  login: (opts: LoginOptions) => Promise<LoginResult | undefined>;
  /**
   * Signup user with user details.
   * @param opts - Object with user's data. Email and password are required fields.
   * @returns Promise resolved with user data or undefined.
   */
  signup: (
    opts: signupOptions
  ) => Promise<SignupResult | Auth0Error | undefined>;
  /**
   * Logout and clears stored token
   * @returns errors. Otherwise null if success.
   */
  logout: () => Promise<void>;
  /**
   * Get user information without meta data by user access token
   * @param opts - User access token.
   * @returns Promise resolved with user data or undefined.
   */
  getUser: (accessToken: string) => Promise<userDetailResult | undefined>;
  /**
   * send email for reset password with user email.
   * @param opts - Object with user's email.
   * @returns Promise resolved with user data or undefined.
   */
  resetPassword: (
    opts: ChangePasswordOptions
  ) => Promise<resetPasswordResult | Auth0Error | undefined>;
  /**
   * Get user full profile with user metadata fields.
   * @param opts - Auth0 user id.
   * @returns Promise resolved with user data or undefined.
   */
  getUserProfile: (
    auth0UserId: string
  ) => Promise<userProfileResult | Auth0Error | undefined>;
  /**
   * Authenticates user with email and password.
   * @param opts - Object with Auth0 user id and user's information with user metadata.
   * @returns Promise resolved with user data or undefined.
   */
  updateUserProfile: (
    auth0UserId: string,
    user: Auth0UserProfile
  ) => Promise<userProfileResult | Auth0Error | undefined>;
  /**
   * Set User tokens in localStorage
   * @param opts - Object with Auth0 accessToken, idToken and expireIn.
   * @returns Promise resolved with user data or undefined.
   */
  setUserAuthSession: (tokens: UserAuthTokens) => void;
}
