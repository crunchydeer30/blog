import { User } from "../../../types"

export interface UserProfile extends User {
  followedBy: {
    followerId: string;
  }[];
  following: {
    followingId: string;
  }[];
}

export interface UpdateProfileInfo {
  displayName?: string;
  personalInfo?: string;
  profileImage?: string;
}