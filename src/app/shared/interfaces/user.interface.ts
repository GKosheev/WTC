export interface User {
  _id: string,
  roles: string[],
  isVerified: boolean,
  wallet: number,
  clubCardId: string,
  subscription: {
    type: string,
    subStarts: string,
    subEnds: string,
    price: string,
    paidAt: string
  },
  profile: {
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    phone: string,
    dateOfBirth: Date,
    rating: string,
    receiveClubEmails: boolean,
    shareMyEmail: boolean,
    shareMyPhone: boolean,
    twitter: string,
    instagram: string,
    facebook: string,
  }
  agreements: {
    clubPolicy: string,
    privacyPolicy: string,
    covidPolicy: string
  },
  private: {
    secureQuestion: string
  }

}
