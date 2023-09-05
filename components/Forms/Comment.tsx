'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { addCommentToThread } from '@/lib/actions/thread.actions';
import { CommentValidation } from '@/lib/validations/thread';
import router from 'next/router';
import Image from 'next/image';

interface CommentProps {
	threadId: string;
	currentUserId: string;
	currentUserImage: string;
}

function Comment({ threadId, currentUserId, currentUserImage }: CommentProps) {
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm({
		resolver: zodResolver(CommentValidation),
		defaultValues: {
			thread: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
		await addCommentToThread(
			threadId,
			values.thread,
			JSON.parse(currentUserId),
			pathname
		);

		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='comment-form'>
				<FormField
					control={form.control}
					name='thread'
					render={({ field }) => (
						<FormItem className='flex flex-row items-center gap-2 w-full'>
							<div>
								<Image
									src={currentUserImage}
									alt='Profile Image'
									width={48}
									height={48}
									className='rounded-full object-cover'
								/>
							</div>
							<FormControl className='border-none bg-transparent'>
								<Input
									type='text'
									placeholder='Comment...'
									className='no-focus text-light-1 outline-none'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit' className='comment-form_btn'>
					Reply
				</Button>
			</form>
		</Form>
	);
}

export default Comment;
