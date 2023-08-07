import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
	return (
		<header className='topbar'>
			<nav>
				<Link href='/' className='flex items-center gap-4'>
					<Image src='/assets/logo.svg' alt='logo' width={28} height={28} />
					<p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
				</Link>
			</nav>
		</header>
	);
}

export default Header;
