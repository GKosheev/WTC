interface Profile {
    fistName: string,
    lastName: string,
    email: string,
    phone: string,
    gender: string,
    dateOfBirth: Date,
    receiveClubEmails: boolean
}

interface Private {
    secureQuestion: string,
    secureAnswer: string,
    password: string,
    repeatPassword: string
}

interface Agreements {
    privacyPolicy: string,
    covidPolicy: string,
    clubPolicy: string,
}

export interface UserRegisterInput {
    profile: Profile,
    agreements: Agreements,
    private: Private
}
