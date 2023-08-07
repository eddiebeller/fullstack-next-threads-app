import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
	return (
		<header className='topbar'>
			<nav className='flex justify-between items-center'>
				<Link href='/' className='flex items-center gap-4'>
					<Image src='/assets/logo.svg' alt='logo' width={28} height={28} />
					<p className='text-heading3-bold text-light-1 max-xs:hidden'>
						Threads
					</p>
				</Link>
				<div className='flex items-center gap-1'>
					<div className='block md:hidden'>
						<SignedIn>
							<SignOutButton>
								<div className='flex cursor-pointer'>
									<Image
										src='/assets/logout.svg'
										alt='logout'
										width={24}
										height={24}
									/>
								</div>
							</SignOutButton>
						</SignedIn>
					</div>
					<OrganizationSwitcher  appearance={{
						elements: {
							organizationSwitcherTrigger: "py-4 px-4"
						}
					}}/>
				</div>
			</nav>
		</header>
	);
}

export default Header;
