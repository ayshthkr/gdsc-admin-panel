import Sidebar from '@/components/Sidebar';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex'>
			<div className='w-[300px] sticky top-0 h-screen bg-gray-900 text-white'>
				<Sidebar />
			</div>
			<main className='flex-1 '>{children}</main>
		</div>
	);
}
