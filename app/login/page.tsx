'use client';

import { Input } from '@/components/ui/input';
import handleLogin from '../_actions/handleLogin';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

const initialState = {
	message: '',
};

export default function Page() {
	const [state, formAction] = useFormState(handleLogin, initialState);
	const { toast } = useToast();

	useEffect(() => {
		if (state?.message)
			toast({
				title: state?.message,
				variant: 'destructive',
			});
	}, [state]);

	return (
		<div className='flex items-center justify-center w-full min-h-screen'>
			<form
				action={formAction}
				className='p-8 bg-card shadow-sm rounded-lg border  text-card-foreground flex flex-col space-y-7'>
				<h1 className='font-bold text-2xl'>Login to Admin panel</h1>
				<div className='flex flex-col space-y-2'>
					<Label htmlFor='email'>Email</Label>
					<Input type='text' name='email' placeholder='Email...' />
				</div>
				<div className='flex flex-col space-y-2'>
					<Label htmlFor='password'>Password</Label>
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

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button type='submit' disabled={pending}>
			Login
		</Button>
	);
}