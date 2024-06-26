import type { User, UserObject } from "next-auth";
import type { Token } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: {
      user_id: string;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      phone: string;
      location: string;
      created_at: string;
      admin: boolean;
      profile_picture: string;
    } & DefaultSession["user"];
  }
  export interface UserObject {
    user_id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    location: string;
    created_at: string;
    admin: boolean;
    profile_picture: string;
  }
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  export interface User extends Token {
    exp: number;
    user: UserObject;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session extends User {
    expires: string;
  }
}

declare module "next-auth/jwt" {
  export interface RefreshedToken {
    access: string;
  }
  export interface Token extends RefreshedToken {
    refresh: string;
  }
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  export interface JWT extends User {
    iat: number;
    jti: string;
  }
  export interface DecodedJWT extends UserObject {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
  }
}
