export interface UserRegister {
  profile: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    gender: string,
    dateOfBirth: Date,
    receiveClubEmails: boolean,
  },
  agreements: {
    clubPolicy: string,
    privacyPolicy: string,
    covidPolicy: string
  },
  private: {
    password: string,
    repeatPassword: string,
    secureQuestion: string,
    secureAnswer: string
  }
}
