import React from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from '@/data';
import Image from 'next/image';

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
			<div className='mt-9'>
				<Tabs defaultValue='threads' className='w-full'>
					<TabsList className='tab'>
						{profileTabs.map((tab) => (
							<TabsTrigger key={tab.label} value={tab.value} className='tab'>
								<Image
									src={tab.icon}
									alt={tab.label}
									width={24}
									height={24}
									className='object-contain'
								/>
								<p className='max-sm:hidden'>{tab.label}</p>
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>
		</section>
	);
}

export default Page;