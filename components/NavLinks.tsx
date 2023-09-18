'use client';
import React from 'react';
import { sidebarLinks } from '@/data';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';

type NavLinksProps = {
	classname: string;
	mobile?: boolean;
};

function NavLinks({ classname, mobile }: NavLinksProps) {
	const pathname = usePathname();
	const { userId } = useAuth();
	return (
		<>
			{sidebarLinks.map((link) => {
				const isLinkActive =
					(pathname.includes(link.route) && link.route.length > 1) ||
					pathname === link.route;

				if (link.route === '/profile') link.route = `${link.route}/${userId}`;

				return (
					<Link
						href={link.route}
						key={link.label}
						className={`${classname} ${isLinkActive ? 'bg-primary-500' : ''}`}
					>
						<Image src={link.imgURL} alt={link.label} width={25} height={25} />
						{mobile ? (
							<p className='text-subtle-medium text-light-1 max-sm:hidden'>
								{link.label.split(/\s+/)[0]}
							</p>
						) : (
							<p className='text-light-1 max-lg:hidden'>{link.label}</p>
						)}
					</Link>
				);
			})}
		</>
	);
}

export default NavLinks;
