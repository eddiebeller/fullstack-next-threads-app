'use server';

import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';

interface ThreadProps {
	content: string;
	author: string;
	communityId: string | null;
	path: string;
}
export async function createThread({
	content,
	author,
	communityId,
	path,
}: ThreadProps) {
	try {
		connectToDB();

		const createdThread = await Thread.create({
			content,
			author,
			community: null,
		});

		// Update user model
		await User.findByIdAndUpdate(author, {
			$push: { threads: createdThread._id },
		});

		revalidatePath(path);
	} catch (error) {
		console.error(error);
	}
}
