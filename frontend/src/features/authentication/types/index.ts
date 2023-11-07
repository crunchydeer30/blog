export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export interface SignedInUser {
  token: string;
  id: string;
  profileImage: string,
  displayName: string
}

export interface UseSignInConfig {
  redirect?: boolean;
}
