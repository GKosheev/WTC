import {Profile} from "./profile/profile.interface";

export interface User {
  roles: string[];
  _id: string;
  profile: Profile
  securityQuestion: string;
  securityAnswer: string;
  clubPolicy: string;
  privacyPolicy: string;
  covidPolicy: string;
  createdAt: string;
  isAdmin: boolean;
}
