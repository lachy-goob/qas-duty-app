import postgres from 'postgres';

import {
    User,
    Job,
    jobsTable,
    userTable
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

