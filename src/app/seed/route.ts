import postgres from 'postgres';
import { users, jobs } from '../lib/db/placeholder-data';
import {User, Job} from "../lib/db/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            googleID VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            path TEXT NOT NULL
        );
    `;

    const insertedUsers = await Promise.all(
        users.map(async (user: User) => {
            return sql `
            INSERT INTO users (id, googleId, name, email, path)
            VALUES ( ${user.id}, ${user.googleId}, ${user.name}, ${user.email} , ${user.path})
            ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

        return insertedUsers;
    }


    async function seedJobs() {
    await sql`
        CREATE TABLE IF NOT EXISTS jobs (
            id SERIAL PRIMARY KEY,
            user_id UUID NOT NULL,
            shiftType VARCHAR(255) NOT NULL,
            dispatchTime TIMESTAMP NOT NULL,
            clearTime TIMESTAMP NOT NULL,
            composition VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            response VARCHAR(255) NOT NULL
        );
    `;

    const insertedJobs = await Promise.all(
        jobs.map(async (job: Job) => {
            return sql `
            INSERT INTO jobs (id, user_id, shiftType, dispatchTime, clearTime, composition, type, response)
            VALUES (${job.id}, ${job.user_id}, ${job.shiftType}, ${job.dispatchTime}, ${job.clearTime}, ${job.composition}, ${job.type}, ${job.response})
            ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedJobs;

    }


export async function GET() {
    try {

      const result = await sql.begin((sql) => [ // eslint-disable-line
        seedUsers(),
        seedJobs(),
      ]);

      console.log(result);
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
}
