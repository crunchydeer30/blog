import { User } from '../../../types';

export interface Subscription {
  id: string;
  followerId: string;
  followingId: string;
}

export interface SubscriptionData {
  followers: Subscription[],
  following: Subscription[],
}

export type UserItem = Pick<
  User,
  'displayName' | 'profileImage' | 'id' | 'personalInfo'
>;
