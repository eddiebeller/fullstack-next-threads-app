import React from 'react';
import Profile from '@/components/Forms/Profile';
import { currentUser } from '@clerk/nextjs';

async function Page() {
	const user = await currentUser();
	const userInformation = {
		id: user?.id as string,
		objId: 'Will come from Database',
		username: user?.username as string,
		name: user?.firstName as string,
		bio: 'Will come from Database',
		image: user?.imageUrl as string,
	};
	return (
		<main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
			<h1 className='head-text'>Onboarding</h1>
			<p className='mt-3 text-base-regular text-light-2'>
				Complete your profile now to start use Threads Application.
			</p>
			<section className='mt-9 bg-dark-2 p-10'>
				<Profile user={userInformation} buttonTitle='Continue...' />
			</section>
		</main>
	);
}

export default Page;
