'use client';
import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';

interface ProfileProps {
	user: {
		id: string;
		objId: string;
		username: string;
		name: string;
		bio: string;
		image: string;
	};
	buttonTitle: string;
}

function Profile({ user, buttonTitle }: ProfileProps) {
	const form = useForm({
		resolver: zodResolver(UserValidation),
		defaultValues: {
			profile_photo: '',
			name: '',
			username: '',
			bio: '',
		},
	});
	return (
		<Form {...form}>
			<form action=''>
				<h1>onboarding form</h1>
			</form>
		</Form>
	);
}

export default Profile;
