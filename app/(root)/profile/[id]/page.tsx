import React from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';

async function Page({ params }: { params: { id: string } }) {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(params.id);

	if (!userInfo.onboarded) redirect('/');

	return (
		<section>
			<ProfileHeader
				accountId={userInfo.id}
				userId={user.id}
				name={userInfo.name}
				username={userInfo.username}
				imageUrl={userInfo.image}
				bio={userInfo.bio}
			/>
		</section>
	);
}

export default Page;
