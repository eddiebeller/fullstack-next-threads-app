import React from 'react';

type ThreadsTab = {
	currentUser: string;
	accountId: string;
	accountType: string;
};
async function Threadstab({ currentUser, accountId, accountType }: ThreadsTab) {
	// Fetch profile threads for the specific user or organization and render it.
	return <section>Threadstab</section>;
}

export default Threadstab;
