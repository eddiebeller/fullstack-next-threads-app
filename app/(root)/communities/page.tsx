import React from 'react';
import { currentUser } from '@clerk/nextjs';
import UserCard from '@/components/UserCard';
import { fetchCommunities } from '@/lib/actions/community.actions';

async function Page() {
	const user = await currentUser();
	if (!user) return null;

	// Fetch communities
	const result = await fetchCommunities({
		searchString: '',
		pageNumber: 1,
		pageSize: 25,
	});

	return (
		<section>
			<h1 className='head-text mb-10'>Search</h1>

			{/* Searchbar component here */}

			<div className='mt-14 flex flex-col gap-9'>
				{result?.communities.length === 0 ? (
					<p className='no-result'>No communities founded...</p>
				) : (
					<>
						{result?.communities.map((community) => (
							<UserCard
								key={community.id}
								id={community.id}
								name={community.name}
								username={community.username}
								image={community.image}
								personType='Community'
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
}

export default Page;
