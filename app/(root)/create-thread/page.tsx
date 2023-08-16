import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';
import console from 'console';

async function Page() {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (!userInfo.onboarded) redirect('/');

	return <h1 className='head-text'>Create Thread</h1>;
}

export default Page;
