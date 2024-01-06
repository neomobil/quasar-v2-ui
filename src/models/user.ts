import { UserInfo } from 'firebase/auth';

export interface UserInterface extends UserInfo {
  firstName?: string | null;
  lastName?: string | null;
  loggedIn?: boolean;
  role?: string | null;
}
