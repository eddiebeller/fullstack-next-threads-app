import React from 'react';
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
			<h1 className='head-text'>Profile Page</h1>
		</section>
	);
}

export default Page;
