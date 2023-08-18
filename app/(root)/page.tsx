import ThreadCard from '@/components/ThreadCard';
import { fetchThreads } from '@/lib/actions/thread.actions';
import { currentUser } from '@clerk/nextjs';

export default async function Home() {
	const user = await currentUser();
	const result = await fetchThreads(1, 30);

	return (
		<>
			<h1 className='head-text head-left'>Home</h1>
			<section className='mt-9 flex flex-col gap-10'>
				{result.posts.length === 0 ? (
					<p className='no-result'>No thread found</p>
				) : (
					<>
						{result.posts.map((post) => (
							<ThreadCard
								key={post._id}
								id={post._id}
								currentUserId={user?.id || ''}
								parentId={post.parentId}
								content={post.content}
								author={post.author}
								community={post.community}
								createdAt={post.createdAt}
								comments={post.children}
							/>
						))}
					</>
				)}
			</section>
		</>
	);
}
