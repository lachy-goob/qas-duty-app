export type User = {
    id: string;
    googleId: string;
    name: string;
    email: string;
    path: string;
    picture: string;
}

export type user_session = {
    id: string,
    user_id: string,
    expires_at: Date,
}

export type Job = {
    id: string;
    user_id: string;
    shiftType: string,
    dispatchTime: Date,
    clearTime: Date,
    composition:  string,
    type: string;
    response: string;
}

export type jobsTable = {
    id: string;
    name: string;
    shiftType: string,
    dispatchTime: Date,
    clearTime: Date,
    composition:  string,
    type: string;
    response: string;
}

export type userTable = {
    name: string;
    jobsCompleted: number;
    dutyHoursRemaining: number;
}
