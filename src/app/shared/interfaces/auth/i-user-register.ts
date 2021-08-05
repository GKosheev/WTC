export interface IUserRegister {
  profile: {
    firstName: string,
    lastName: string,
    email: string,
    registrationType: string,
    phone: string,
    gender: string,
    dateOfBirth: Date,
    receiveClubEmails: boolean,
  },
  password: string,
  confirmedPassword: string,
  securityQuestion: string,
  securityAnswer: string,
  clubPolicy: string,
  privacyPolicy: string,
  covidPolicy: string
}
