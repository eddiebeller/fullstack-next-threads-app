'use client';
import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';

type ProfileProps = {
	user: {
		id: string;
		objId: string;
		username: string;
		name: string;
		bio: string;
		image: string;
	};
	buttonTitle: string;
};

function Profile({ user, buttonTitle }: ProfileProps) {
	const [files, setFiles] = useState<File[]>([]);
	const { startUpload } = useUploadThing('media');
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm({
		resolver: zodResolver(UserValidation),
		defaultValues: {
			profile_photo: user?.image || '',
			name: user?.name || '',
			username: user?.username || '',
			bio: user?.bio || '',
		},
	});

	function handleImage(
		event: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) {
		event.preventDefault();
		const fileReader = new FileReader();

		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];

			setFiles(Array.from(event.target.files));

			if (!file.type.includes('image')) return;

			fileReader.onload = async (event) => {
				const imageDataUrl = event.target?.result?.toString() || '';
				fieldChange(imageDataUrl);
			};
			fileReader.readAsDataURL(file);
		}
	}

	async function onSubmit(values: z.infer<typeof UserValidation>) {
		const profileImage = values.profile_photo;

		const hasProfileImage = isBase64Image(profileImage);

		if (hasProfileImage) {
			const profileImageResponse = await startUpload(files);
			if (profileImageResponse && profileImageResponse[0].fileUrl) {
				values.profile_photo = profileImageResponse[0].fileUrl;
			}
		}

		//TODO: Update the user profile after submit(call the API function on backend)
		await updateUser({
			userId: user.id,
			username: values.username,
			name: values.name,
			bio: values.bio,
			image: values.profile_photo,
			path: pathname,
		});

		if (pathname === '/profile/edit') {
			router.back();
		} else {
			router.push('/');
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col justify-start gap-10'
			>
				<FormField
					control={form.control}
					name='profile_photo'
					render={({ field }) => (
						<FormItem className='flex items-center gap-4'>
							<FormLabel className='account-form_image-label'>
								{field.value ? (
									<Image
										src={field.value}
										alt='profile photo'
										width={96}
										height={96}
										priority
										className='rounded-full object-contain'
									/>
								) : (
									<Image
										src='/assets/profile.svg'
										alt='profile photo'
										width={24}
										height={24}
										className=' object-contain'
									/>
								)}
							</FormLabel>
							<FormControl className='flex-1 text-base-semibold text-gray-200'>
								<Input
									type='file'
									accept='image/*'
									placeholder='Upload profile photo'
									className='account-form_image-input'
									onChange={(e) => handleImage(e, field.onChange)}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-2 w-full'>
							<FormLabel className='text-base-semibold text-light-2 gap-3'>
								Name
							</FormLabel>
							<FormControl className='account-form_input no-focus'>
								<Input
									type='text'
									placeholder='Name'
									className='account-form_image-input'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-2 w-full'>
							<FormLabel className='text-base-semibold text-light-2 gap-3'>
								Username
							</FormLabel>
							<FormControl className='account-form_input no-focus'>
								<Input
									type='text'
									placeholder='Username'
									className='account-form_image-input'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-2 w-full'>
							<FormLabel className='text-base-semibold text-light-2 gap-3'>
								Bio
							</FormLabel>
							<FormControl className='account-form_input no-focus'>
								<Textarea
									rows={10}
									placeholder='Bio'
									className='account-form_image-input'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit' className='bg-primary-500'>
					{buttonTitle}
				</Button>
			</form>
		</Form>
	);
}

export default Profile;
