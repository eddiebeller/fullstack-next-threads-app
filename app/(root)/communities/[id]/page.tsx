import React from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import { currentUser } from '@clerk/nextjs';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { communityTabs, profileTabs } from '@/data';
import Image from 'next/image';
import Threadstab from '@/components/Threadstab';
import { fetchCommunityDetails } from '@/lib/actions/community.actions';
import { userInfo } from 'os';
import UserCard from '@/components/UserCard';

async function Page({ params }: { params: { id: string } }) {
	const user = await currentUser();
	if (!user) return null;

	const CommunityDetails = await fetchCommunityDetails(params.id);

	return (
		<section>
			<ProfileHeader
				accountId={CommunityDetails.id}
				userId={user.id}
				name={CommunityDetails.name}
				username={CommunityDetails.username}
				imageUrl={CommunityDetails.image}
				bio={CommunityDetails.bio}
				type='Community'
			/>
			<div className='mt-9'>
				<Tabs defaultValue='threads' className='w-full'>
					<TabsList className='tab'>
						{communityTabs.map((tab) => (
							<TabsTrigger key={tab.label} value={tab.value} className='tab'>
								<Image
									src={tab.icon}
									alt={tab.label}
									width={24}
									height={24}
									className='object-contain'
								/>
								<p className='max-sm:hidden'>{tab.label}</p>
								{tab.label === 'Threads' && (
									<p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
										{CommunityDetails?.threads?.length}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>
					<TabsContent value='threads' className='w-full text-light-1'>
						<Threadstab
							currentUserId={user?.id}
							accountId={CommunityDetails?._id}
							accountType='Community'
						/>
					</TabsContent>
					<TabsContent value='members' className='w-full text-light-1'>
						<section className='mt-9 flex flex-col gap-10'>
							{CommunityDetails?.members.map((member: any) => (
								<UserCard
									key={member.id}
									id={member.id}
									name={member.name}
									username={member.username}
									image={member.image}
									personType='User'
								/>
							))}
						</section>
					</TabsContent>
					<TabsContent value='request' className='w-full text-light-1'>
						<Threadstab
							currentUserId={user?.id}
							accountId={CommunityDetails?.id}
							accountType='User'
						/>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}

export default Page;
