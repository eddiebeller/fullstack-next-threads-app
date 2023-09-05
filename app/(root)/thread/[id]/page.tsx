import Comment from '@/components/Forms/Comment';
import ThreadCard from '@/components/ThreadCard';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: { id: string } }) => {
	if (!params.id) return null;

	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect('/onboarding');

	const thread = await fetchThreadById(params.id);

	return (
		<section className='relative'>
			<div>
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={user?.id || ''}
					parentId={thread.parentId}
					content={thread.content}
					author={thread.author}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			</div>
			<div className='mt-7'>
				<Comment
					threadId={thread.id}
					currentUserImage={user.imageUrl}
					currentUserId={JSON.stringify(userInfo._id)}
				/>
			</div>

			<div className='mt-7'>
				{thread.children.map((childItem: any) => (
					<ThreadCard
						key={childItem._id}
						id={childItem._id}
						currentUserId={childItem?.id || ''}
						parentId={childItem.parentId}
						content={childItem.content}
						author={childItem.author}
						community={childItem.community}
						createdAt={childItem.createdAt}
						comments={childItem.children}
					/>
				))}
			</div>
		</section>
	);
};

export default Page;