//Utilising Materialised Paths

const user = [
    {
        id: '1',
        name: 'Lachlan Goebel',
        email: 'lachlangoebel@gmail.com',
        password: 'password',
        path: "1/2/"
    },
    {
        id: '2',
        name: 'Theron Goebel',
        email: 'lgoobdev@gmail.com',
        password: 'password',
        path: "1/"
    },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const job = [
    {
       user_id: user[0].id,
       shiftType: "day",
       dispatchTime: "2025-01-01T08:00:00",
       clearTime: "2025-01-01T10:00:00",
       composition: "CCP",
       type: "IHT",
       response: "RSQ Flight"
    },
    {
        user_id: user[1].id,
        shiftType: "night",
        dispatchTime: "2025-01-01T19:00:00",
        clearTime: "2025-01-01T21:30:00",
        composition: "CCP + FMO",
        type: "Primary",
        response: "QAS Road"
     },
]
