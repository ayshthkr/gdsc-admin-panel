'use client';

import { Toaster } from '@/components/ui/toaster';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<>
			<Toaster />
			{children}
		</>
	);
}
