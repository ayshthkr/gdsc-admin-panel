import { GeistSans } from 'geist/font/sans';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import Providers from './Providers';

export const metadata: Metadata = {
	title: 'GDSC NSUT Admin Panel',
	description: 'GDSC NSUT Admin Panel for the blog',
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${GeistSans.className}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
