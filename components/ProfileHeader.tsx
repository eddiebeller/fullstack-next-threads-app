import Image from 'next/image';
import React from 'react';

type ProfileHeaderProps = {
	accountId: string;
	userId: string;
	name: string;
	username: string;
	imageUrl: string;
	bio: string;
	type: 'User' | 'Community';
};

function ProfileHeader({
	accountId,
	userId,
	name,
	username,
	imageUrl,
	bio,
	type
}: ProfileHeaderProps) {
	return (
		<div className='flex w-full flex-col justify-start'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<figure className='relative h-20 w-20 object-cover'>
						<Image
							src={imageUrl}
							alt='profile image'
							fill
							className='rounded-full object-cover shadow-2xl'
						/>
					</figure>
					<div className='flex-1'>
						<h2 className='text-left text-heading3-bold text-light-1'>
							{name}
						</h2>
						<p className='text-gray-1 text-base-medium'>@{username}</p>
					</div>
				</div>
			</div>
			<p className='text-light-2 mt-2 max-w-full text-base-regular'>{bio}</p>
			<div className='mt-7 h-0.5 w-full bg-dark-3' />
		</div>
	);
}

export default ProfileHeader;
