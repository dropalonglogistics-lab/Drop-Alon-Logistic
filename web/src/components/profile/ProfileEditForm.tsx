'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Loader2 } from 'lucide-react';
import { uploadAvatar, updateProfile } from '@/app/profile/actions';
import Image from 'next/image';

interface ProfileEditFormProps {
    profile: {
        full_name: string | null;
        phone_number: string | null;
        avatar_url: string | null;
    };
    onCancel: () => void;
    onSuccess: () => void;
}

export function ProfileEditForm({ profile, onCancel, onSuccess }: ProfileEditFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar_url);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            // Upload avatar if a new file was selected
            if (selectedFile) {
                const avatarFormData = new FormData();
                avatarFormData.append('avatar', selectedFile);
                const avatarResult = await uploadAvatar(avatarFormData);

                if (avatarResult.error) {
                    setError(avatarResult.error);
                    setIsLoading(false);
                    return;
                }
            }

            // Update profile
            const result = await updateProfile(formData);

            if (result.error) {
                setError(result.error);
            } else {
                onSuccess();
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-dal-gold/20 flex items-center justify-center">
                        {avatarPreview ? (
                            <Image
                                src={avatarPreview}
                                alt="Profile"
                                width={96}
                                height={96}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <Camera className="w-8 h-8 text-dal-gold" />
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-2 bg-dal-gold rounded-full hover:bg-dal-gold-hover transition-colors"
                    >
                        <Camera className="w-4 h-4 text-dal-black" />
                    </button>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Click camera icon to upload photo (max 5MB)
                </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-gray-200">Full Name</label>
                    <Input
                        name="full_name"
                        type="text"
                        defaultValue={profile.full_name || ''}
                        placeholder="Enter your full name"
                        required
                        className="dark:bg-input dark:border-border dark:text-white"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-gray-200">Phone Number</label>
                    <Input
                        name="phone_number"
                        type="tel"
                        defaultValue={profile.phone_number || ''}
                        placeholder="+234 XXX XXX XXXX"
                        className="dark:bg-input dark:border-border dark:text-white"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="flex-1 dark:border-border dark:text-white dark:hover:bg-accent"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-dal-gold hover:bg-dal-gold-hover text-dal-black font-semibold"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </div>
        </form>
    );
}
