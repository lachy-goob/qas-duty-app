export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    path: string;
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
