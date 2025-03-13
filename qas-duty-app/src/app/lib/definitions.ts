export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    path: string;
}

export type job = {
    id: string;
    shiftType: 'day' | 'night';
    dispatchTime: Date,
    clearTime: Date,
    composition: 'CCP' | 'CCP + FMO';
    type: 'IHT' | 'Primary' | 'Modified Primary' | 'Search and Rescue' | 'Winch';
    response: 'RSQ Flight' | 'RSQ Road' | 'QAS Road'
}

export type jobsTable = {
    id: string;
    name: string;
    shiftType: 'day' | 'night';
    dispatchTime: Date,
    clearTime: Date,
    composition: 'CCP' | 'CCP + FMO';
    type: 'IHT' | 'Primary' | 'Modified Primary' | 'Search and Rescue' | 'Winch';
    response: 'RSQ Flight' | 'RSQ Road' | 'QAS Road'
}

export type userTable = {
    name: string;
    jobsCompleted: number;
    dutyHoursRemaining: number;
}
