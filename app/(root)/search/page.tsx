import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { profileTabs } from '@/data';
import Image from 'next/image';
import Threadstab from '@/components/Threadstab';

async function Page() {
	const user = await currentUser();
	if (!user) return null;

	// Fech current user
	const userInfo = await fetchUser(user.id);
	// Fetch users
	const result = await fetchUsers({
		userId: user.id,
		searchString: '',
		pageNumber: 25,
		pageSize: 1,
	});

	if (!userInfo?.onboarded) redirect('/');

	// TODO: Fetch users
	async function Page() {
		return (
			<section>
				<h1 className='head-text mb-10'>Search</h1>
			</section>
		);
	}
}

export default Page;
