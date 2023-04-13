import { createTRPCRouter } from '../trpc';
import { transactionsRouter } from './transactions';
import { tagsRouter } from './tags';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
	transactions: transactionsRouter,
	tags: tagsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
