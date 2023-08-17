'use client';
import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
// import { updateThread } from '@/lib/actions/user.actions';
import { ThreadValidation } from '@/lib/validations/thread';
import { Textarea } from '../ui/textarea';
import { createThread } from '@/lib/actions/thread.actions';

interface PostThreadProps {
	user: {
		id: string;
		objId: string;
		username: string;
		name: string;
		bio: string;
		image: string;
	};
	buttonTitle: string;
}

function PostThread({ userId }: { userId: string }) {
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm({
		resolver: zodResolver(ThreadValidation),
		defaultValues: {
			thread: '',
			account_id: userId,
		},
	});

	const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
		await createThread({
			content: values.thread,
			author: userId,
			communityId: null,
			path: pathname,
		});
    router.push('/')
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mt-10 flex flex-col justify-start gap-10'
			>
				<FormField
					control={form.control}
					name='thread'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-2 w-full'>
							<FormLabel className='text-base-semibold text-light-2 gap-3'>
								Content
							</FormLabel>
							<FormControl className='no-focus border border-dark-3 bg-dark-3 text-light-1'>
								<Textarea rows={15} {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit' className='bg-primary-500'>
					Post a thread
				</Button>
			</form>
		</Form>
	);
}

export default PostThread;
