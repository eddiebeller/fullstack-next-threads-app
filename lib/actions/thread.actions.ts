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

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
	connectToDB();

	//Calculate the number of posts skip
	const skipAmount = (pageNumber - 1) * pageSize;

	//Fetch posts that have no partents(top-level)
	const threadQuery = Thread.find({ parentId: { $in: [null, undefined] } })
		.sort({ createdAt: 'desc' })
		.skip(skipAmount)
		.limit(pageSize)
		.populate({ path: 'author', model: User })
		.populate({
			path: 'children',
			populate: {
				path: 'author',
				model: User,
				select: '_id name parentId image',
			},
		});

	const totalThreadCount = await Thread.countDocuments({
		parentId: { $in: [null, undefined] },
	});
	const posts = await threadQuery.exec();
	const isNext = totalThreadCount + skipAmount + posts.length;

	return { posts, isNext };
}
