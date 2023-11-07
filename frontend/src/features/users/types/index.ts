import { User } from "../../../types";
import { PaginationInfo } from "../../../types";

export interface UserQueryParams {
  page?: number;
  pageSize?: number;
  q?: string;
}

export interface PaginatedUserItems {
  data: User[];
  meta: PaginationInfo;
}

export type UserItem = Pick<
  User,
  'displayName' | 'profileImage' | 'id' | 'personalInfo'
>;