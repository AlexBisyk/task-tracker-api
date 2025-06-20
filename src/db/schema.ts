import {
    pgTable,
    serial,
    varchar,
    timestamp,
    integer,
    text,
} from 'drizzle-orm/pg-core';

//table users
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 100 }),
    createdAt: timestamp('createdAt').defaultNow(),
});

// table tasks
export const tasks = pgTable('tasks', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text(),
    status: varchar('status', { length: 255 }).default('pending'),
    priority: integer('priority').default(1),
    userId: integer('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('createdAt').defaultNow(),
});
