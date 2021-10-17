export interface UserRegister {
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
  repeatPassword: string,
  securityQuestion: string,
  securityAnswer: string,
  clubPolicy: string,
  privacyPolicy: string,
  covidPolicy: string
}
