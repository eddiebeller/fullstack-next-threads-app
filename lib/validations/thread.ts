import * as z from 'zod';

export const ThreadValidation = z.object({
	thread: z.string().nonempty().min(3).max(500),
	account_id: z.string(),
});
