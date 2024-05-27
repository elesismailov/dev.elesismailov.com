import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    const url = process.env.POSTGRES_URL || // Read from POSTGRES_URL
        `postgresql://<YOUR_LOCAL_POSTGRES_USERNAME>:<YOUR_LOCAL_POSTGRES_PASSWORD>@localhost:5432/<YOUR_LOCAL_DATABASE_NAME>?schema=public`; // Add this line for local fallback

    if (!global.prisma) {
        global.prisma = new PrismaClient({
            datasources: {
                db: {
                    url,
                },
            },
        });
    }
    prisma = global.prisma;
}

export default prisma;
