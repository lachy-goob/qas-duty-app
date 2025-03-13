//Utilising Materialised Paths
import { Job } from "./definitions"

export const users = [
    {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Lachlan Goebel',
        email: 'lachlangoebel@gmail.com',
        password: 'password',
        path: "1/2/"
    },
    {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        name: 'Theron Goebel',
        email: 'lgoobdev@gmail.com',
        password: 'password',
        path: "1/"
    },
]

export const jobs: Job[] = [
    {
       id : '1',
       user_id: users[0].id,
       shiftType: "day",
       dispatchTime: new Date("2025-01-01T08:00:00"),
       clearTime: new Date("2025-01-01T10:00:00"),
       composition: "CCP",
       type: "IHT",
       response: "RSQ Flight"
    },
    {
        id : '2',
        user_id: users[1].id,
        shiftType: "night",
        dispatchTime: new Date("2025-01-01T19:00:00"),
        clearTime: new Date("2025-01-01T21:30:00"),
        composition: "CCP + FMO",
        type: "Primary",
        response: "QAS Road"
     },
]
