import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import Link from 'next/link';
import Image from 'next/image';

async function Page() {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect('/onboarding');

	const activity = await getActivity(userInfo._id);

	return (
		<section>
			<h1 className='head-text mb-10'>
				<section className='mt-10 flex flex-col gap-5'>
					{activity?.length > 0 ? (
						<>
							{activity?.map((activity) => (
								<article className='activity-card'>
									<Link
										href={`/thread/${activity.parentId}`}
										key={activity.id}
										className='flex gap-3 items-center'
									>
										<Image
											src={activity.author.image}
											alt='user logo'
											width={40}
											height={40}
											className='rounded-full'
										/>
										<p className='!text-small-regular text-light-1'>
											<span className='mr-1 text-primary-500'>
												{activity.author.name}
											</span>
											replied to your thread
										</p>
									</Link>
								</article>
							))}
						</>
					) : (
						<>
							<p className='!text-base-regular text-light-3'>
								{' '}
								No activity yet...
							</p>
						</>
					)}
				</section>
			</h1>
		</section>
	);
}

export default Page;
