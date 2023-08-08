import React from 'react';
import NavLinks from './NavLinks';

function Footer() {
	return (
		<footer className='bottombar'>
			<div className='bottombar_container'>
				<NavLinks classname='bottombar_link' mobile={true} />
			</div>
		</footer>
	);
}

export default Footer;
