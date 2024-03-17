'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from 'next-auth/react'


export default function Component() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Perform form submission logic here
        setIsLoading(true);
        // Example: send form data to the server
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/user/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            // Handle response
            if (response.ok) {
                const result = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });
                router.push('/chat');
            } else {
                // Handle error response
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
        setIsLoading(false);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray">
                <div className="text-center">
                    <div className="mt-[-100px] space-y-2">
                        <h3 className="text-2xl font-bold sm:text-3xl">
                            Sign up now!
                        </h3>
                        <p className="">
                            Already have an account? &nbsp;
                            <Link href="/login" className="font-medium underline">
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={onChange}
                            required
                            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            required
                            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            required
                            className="w-full mt-2 px-3 py-2  bg-transparent outline-none border shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={onChange}
                            required
                            className="w-full mt-2 px-3 py-2  bg-transparent outline-none border shadow-sm rounded-lg"
                        />
                    </div>
                    <Button className="w-full px-4 py-2 font-medium rounded-lg duration-150">
                        {isLoading ? "Signing up..." : "Sign up"}
                    </Button>
                </form>
            </div>
        </main>
    )
}
