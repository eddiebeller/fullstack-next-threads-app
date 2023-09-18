import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';

async function Page() {
	const user = await currentUser();
	if (!user) return null;

	// Fech current user
	const userInfo = await fetchUser(user.id);

	if (!userInfo?.onboarded) redirect('/onboarding');

	// Fetch users
	const result = await fetchUsers({
		userId: user.id,
		searchString: '',
		pageNumber: 1,
		pageSize: 25,
	});

	return (
		<section>
			<h1 className='head-text mb-10'>Search</h1>

			{/* Searchbar component here */}

			<div className='mt-14 flex flex-col gap-9'>
				{result?.users.length === 0 ? (
					<p className='no-result'>No users founded...</p>
				) : (
					<>
						{result?.users.map((user) => (
							<p className='text-white text-heading1-bold'>
								{user.name} {user.username}
							</p>
						))}
					</>
				)}
			</div>
		</section>
	);
}

export default Page;
