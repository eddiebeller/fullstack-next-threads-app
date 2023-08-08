'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { SignOutButton, SignedIn } from '@clerk/nextjs';
import NavLinks from './NavLinks';

function LeftSidebar() {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<aside className='custom-scrollbar leftsidebar'>
			<nav className='flex w-full flex-1 flex-col gap-6 px-6'>
				<NavLinks classname='leftsidebar_link' />
			</nav>
			<div className='mt-10 px-6'>
				<SignedIn>
					<SignOutButton signOutCallback={() => router.push('/sign-in')}>
						<div className='flex cursor-pointer gap-5 p-4'>
							<Image
								src='/assets/logout.svg'
								alt='logout'
								width={24}
								height={24}
							/>
							<p className='text-light-2 max-lg:hidden'>Logout</p>
						</div>
					</SignOutButton>
				</SignedIn>
			</div>
		</aside>
	);
}

export default LeftSidebar;
