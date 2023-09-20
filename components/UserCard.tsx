'use client';
import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

type UserCardProps = {
	name: string;
	username: string;
	image: string;
	id: string;
	personType?: string;
};
function UserCard({ name, username, image, id, personType }: UserCardProps) {
	const router = useRouter();

	return (
		<article className='user-card'>
			<figure className='user-card_avatar'>
				<Image
					src={image}
					alt='user avatar'
					height={40}
					width={40}
					className='rounded-full'
				/>
				<div className='flex-1 text-ellipsis'>
					<h4 className='text-base-semibold text-light-1'>{name}</h4>
					<a
						className='text-small-medium text-gray-1 hover:underline decoration-slate-400'
						href={`/profile/${id}`}
					>
						@{username}
					</a>
				</div>
			</figure>
			<Button
				className='user-card_btn'
				onClick={() => router.push(`/profile/${id}`)}
			>
				View
			</Button>
		</article>
	);
}

export default UserCard;
