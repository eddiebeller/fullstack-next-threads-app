'use server';

import { revalidatePath } from 'next/cache';
import { connectToDB } from '../mongoose';
import User from '../models/user.model';

export async function updateUser(
	userId: string,
	username: string,
	name: string,
	bio: string,
	image: string,
	path: string
): Promise<void> {
	connectToDB();

	try {
		await User.findByIdAndUpdate(
			{ id: userId },
			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
				path,
				onboarded: true,
			},
			{ upsert: true }
		);

		if (path === '/profile/edit') {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error.message}`);
	}
}
