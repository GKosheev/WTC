export interface User {
  roles: string[];
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  receiveClubEmails: string;
  securityQuestion: string;
  securityAnswer: string;
  phone: string;
  clubPolicy: string;
  privacyPolicy: string;
  covidPolicy: string;
  createdAt: string;

  isAdmin: boolean;
  rating: string;
}
