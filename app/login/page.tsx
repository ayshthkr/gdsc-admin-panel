'use client';

import { Input } from '@/components/ui/input';
import handleLogin from '../_actions/handleLogin';
import { Label } from '@/components/ui/label';
import SubmitButton from './SubmitButton';

export default function Page() {
	return (
		<div className='flex items-center justify-center w-full min-h-screen'>
			<form
				action={handleLogin}
				className='p-8 bg-card shadow-sm rounded-lg border  text-card-foreground flex flex-col space-y-7'>
				<h1 className='font-bold text-2xl'>Login to Admin panel</h1>
				<div className='flex flex-col space-y-2'>
					<Label htmlFor='email'>Email</Label>
					<Input type='text' name='email' placeholder='Email...' />
				</div>
				<div className='flex flex-col space-y-2'>
                    <Label htmlFor='password'>
                        Password
                    </Label>
					<Input
						type='password'
						name='password'
						placeholder='Password...'
					/>
				</div>
                <SubmitButton />
			</form>
		</div>
	);
}
