import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import '../globals.css';
import Header from '@/components/Header';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import Footer from '@/components/Footer';

const metadata = {
	title: 'Threads Application',
	description: 'Next.js Threads Application',
};
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${inter.className} bg-dark-3`}>
					<Header />
					<main>
						<LeftSidebar />
						<section className='main-container'>
							<div className='w-full max-w-4xl'>{children}</div>
						</section>
						<RightSidebar />
					</main>
					<Footer />
				</body>
			</html>
		</ClerkProvider>
	);
}
