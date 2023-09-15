import { fetchUserPosts } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react';
import ThreadCard from './ThreadCard';

type ThreadsTab = {
	currentUserId: string;
	accountId: string;
	accountType: string;
};
async function Threadstab({
	currentUserId,
	accountId,
	accountType,
}: ThreadsTab) {
	//TODO: Fetch profile threads for the specific user or organization and render it.
	let result = await fetchUserPosts(accountId);

	if (!result) redirect('/');

	return (
		<section className='mt-9 flex flex-col gap-10'>
			{result?.threads.map((thread: any) => (
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={currentUserId}
					parentId={thread.parentId}
					content={thread.content}
					author={
						accountType === 'User'
							? { name: result.name, image: result.image, id: result.id }
							: {
									name: thread.author.name,
									image: thread.author.image,
									id: thread.author.id,
							  }
					}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			))}
		</section>
	);
}

export default Threadstab;
