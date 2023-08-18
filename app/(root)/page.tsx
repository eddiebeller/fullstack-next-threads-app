import { fetchThreads } from '@/lib/actions/thread.actions';

export default async function Home() {
	const result = await fetchThreads(1, 30);

	return (
		<>
			<h1 className='head-text head-left'>Home</h1>
			<section className='mt-9 flex flex-cal gap-10'>
				{result.posts.length === 0 ? (
					<p className='no-result'>No thread found</p>
				) : (
					<>
						{result.posts.map((post) => (
							<div key={post.id}>{post.content}</div>
						))}
					</>
				)}
			</section>
		</>
	);
}
