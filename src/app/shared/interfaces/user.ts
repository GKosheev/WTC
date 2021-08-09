import {IProfile} from "./iprofile";

export interface User {
  roles: string[];
  _id: string;
  profile: IProfile
  securityQuestion: string;
  securityAnswer: string;
  clubPolicy: string;
  privacyPolicy: string;
  covidPolicy: string;
  createdAt: string;
  isAdmin: boolean;
}
