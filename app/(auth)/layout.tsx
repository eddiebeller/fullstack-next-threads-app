import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import '../globals.css';

export const metadata = {
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
		<ClerkProvider publishableKey={process.env.CLERK_SECRET_KEY}>
			<html lang='en'>
				<body className={`${inter.className} bg-dark-3`}>
					<div className='w-full min-h-screen flex justify-center items-center'>
						{children}
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
