export interface IUserRegister {
  firstName: string,
  lastName: string,
  email: string,
  registrationType: string,
  password: string,
  confirmedPassword: string,
  gender: string,
  dateOfBirth: Date,
  receiveClubEmails: boolean,
  securityQuestion: string,
  securityAnswer: string,
  phone: string,
  clubPolicy: string,
  privacyPolicy: string,
  covidPolicy: string
}
