import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';

async function Page() {
	const user = await currentUser();
	if (!user) return null;

	// Fech current user
	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect('/onboarding');

	// TODO: create a new action fetchActivities() or getNotifacations()

	return (
		<section>
			<h1 className='head-text mb-10'>Activity</h1>
		</section>
	);
}

export default Page;
