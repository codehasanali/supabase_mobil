import "react-native-url-polyfill/auto";
import React from "react";

import { EmailOtpType, Session, createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { useSegments, useRouter } from "expo-router";

import { SupabaseContext } from "./SupabaseContext";
import { supabaseUrl, supabaseKey } from "./supabase";

// We are using Expo Secure Store to persist session info
const ExpoSecureStoreAdapter = {
	getItem: (key: string) => {
		return SecureStore.getItemAsync(key);
	},
	setItem: (key: string, value: string) => {
		SecureStore.setItemAsync(key, value);
	},
	removeItem: (key: string) => {
		SecureStore.deleteItemAsync(key);
	},
};
function useProtectedRoute(isLoggedIn: boolean) {
	const segments = useSegments();
	const router = useRouter();

	React.useEffect(() => {
		const inAuthGroup = segments[0] === "(auth)";

		if (
			!isLoggedIn &&
			!inAuthGroup
		) {
			// Redirect to the sign-up page.
			router.replace("/sign-up");
		} else if (isLoggedIn && inAuthGroup) {
			router.replace("/");
		}
	}, [isLoggedIn, segments]);
}

type SupabaseProviderProps = {
	children: JSX.Element | JSX.Element[];
};

export const SupabaseProvider = (props: SupabaseProviderProps) => {
	const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false);
	const [userProfile, setUserProfile] = React.useState(null);

	const [session, setSession] = React.useState<Session | null>(null);


	const supabase = createClient(supabaseUrl, supabaseKey, {
		auth: {
			storage: ExpoSecureStoreAdapter,
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false,
		},
	});

	const signUp = async (email: string, password: string) => {
		const { error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) throw error;

	};


	const verifyOtp = async (
		email: string,
		token: string,
		type: EmailOtpType,
	) => {
		const { error } = await supabase.auth.verifyOtp({
			email,
			token,
			type,
		});
		if (error) throw error;
		setLoggedIn(true);
	};

	const signInWithPassword = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) throw error;
		setLoggedIn(true);
	};





	const resetPasswordForEmail = async (email: string) => {
		const { error } = await supabase.auth.resetPasswordForEmail(email);
		if (error) throw error;
	};
	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		setLoggedIn(false);
	};





	const getProfile = async () => {
		try {
			const session = await supabase.auth.getSession();
			if ((session as { error: any }).error) {
				throw (session as { error: any }).error;
			}

			const { data, error, status } = await supabase
				.from('profiles')
				.select(`username`)
				.eq('id', session.data?.session?.user?.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}
			console.log(error)

			if (data) {
				setUserProfile(data.username);
				
			}
		} catch (error) {
			alert((error as { message: string }).message);
		}
	};
	const getSession = async () => {
		const result = await supabase.auth.getSession();
		setLoggedIn(result.data.session !== null);


		setSession(result.data.session);
		if (result.data.session !== null) {
			getProfile()
		}

	};

	React.useEffect(() => {
		getSession();
		console.log("profile", userProfile);
		console.log("isLoggedIn", isLoggedIn);
	}, [isLoggedIn]);

	useProtectedRoute(isLoggedIn);

	return (
		<SupabaseContext.Provider
			value={{
				isLoggedIn,
				signInWithPassword,
				verifyOtp,
				signUp,
				resetPasswordForEmail,
				signOut,
				session,
				username:userProfile


			}}
		>
			{props.children}
		</SupabaseContext.Provider>
	);
};
