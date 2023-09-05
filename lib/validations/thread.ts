import * as z from 'zod';

export const ThreadValidation = z.object({
	thread: z.string().nonempty().min(3).max(500),
	account_id: z.string(),
});

export const CommentValidation = z.object({
	thread: z
		.string()
		.nonempty()
		.min(3, { message: 'Comment must me minimun 3 characters.' }),
});
