import React from 'react';
import CommunityCard from '@/components/CommunityCard';
import { currentUser } from '@clerk/nextjs';
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
			<h1 className='head-text mb-10'>Communities</h1>

			{/* Searchbar component here */}

			<div className='mt-14 flex flex-col gap-9'>
				{result?.communities.length === 0 ? (
					<p className='no-result'>No communities founded...</p>
				) : (
					<>
						{result?.communities.map((community) => (
							<CommunityCard
								key={community.id}
								id={community.id}
								name={community.name}
								username={community.username}
								image={community.image}
								bio={community.bio}
								members={community.members}
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
}

export default Page;
