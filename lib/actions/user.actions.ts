'use server';

import { revalidatePath } from 'next/cache';
import { connectToDB } from '../mongoose';
import User from '../models/user.model';
import Thread from '../models/thread.model';
import { FilterQuery, SortOrder } from 'mongoose';

type UpdateUserProps = {
	userId: string;
	username: string;
	name: string;
	bio: string;
	image: string;
	path: string;
};

export async function updateUser({
	userId,
	username,
	name,
	bio,
	image,
	path,
}: UpdateUserProps): Promise<void> {
	try {
		connectToDB();

		await User.findOneAndUpdate(
			{ id: userId },
			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
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
export async function fetchUser(id: string) {
	try {
		connectToDB();

		return await User.findOne({ id: id });
	} catch (error) {
		console.error(error);
	}
}

export async function fetchUserPosts(userId: string) {
	try {
		connectToDB();
		// Find all posts authored by user with given userId
		const threads = await User.findOne({ id: userId }).populate({
			path: 'threads',
			model: Thread,
			populate: {
				path: 'children',
				model: Thread,
				populate: {
					path: 'author',
					model: User,
					select: 'name image id',
				},
			},
		});

		return threads;
	} catch (error) {
		console.error(error);
	}
}

export async function fetchUsers({
	userId,
	searchString = '',
	pageNumber = 1,
	pageSize = 20,
	sortBy = 'desc',
}: {
	userId: string;
	searchString?: string;
	pageNumber?: number;
	pageSize?: number;
	sortBy?: SortOrder;
}) {
	try {
		connectToDB();
		const skipAmount = (pageNumber - 1) * pageSize;
		const regex = new RegExp(searchString, 'i');

		const query: FilterQuery<typeof User> = {
			id: { $ne: userId },
		};
		if (searchString.trim() !== '') {
			query.$or = [
				{ username: { $regex: regex } },
				{ name: { $regex: regex } },
			];
		}
		const sortOptions = { createdAt: sortBy };
		const usersQuery = User.find(query)
			.sort(sortOptions)
			.skip(skipAmount)
			.limit(pageSize);
		const totalUser = await User.countDocuments(query);
		const users = await usersQuery.exec();
		const isNext = totalUser > skipAmount + users.length;

		return { users, isNext };
	} catch (error) {
		console.error(error);
	}
}
