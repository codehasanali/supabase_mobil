import { createContext } from "react";
import { EmailOtpType, Session } from "@supabase/supabase-js";
import { string } from "zod";

type SupabaseContextProps = {
	isLoggedIn: boolean;
	signUp: (email: string, password: string) => Promise<void>;
	verifyOtp: (
		email: string,
		token: string,
		type: EmailOtpType,
	) => Promise<void>;
	signInWithPassword: (email: string, password: string) => Promise<void>;
	resetPasswordForEmail: (email: string) => Promise<void>;
	signOut: () => Promise<void>;
	session:Session |null;
	username:string |null;

};

export const SupabaseContext = createContext<SupabaseContextProps>({
	isLoggedIn: false,
	signUp: async () => {},
	verifyOtp: async () => {},
	signInWithPassword: async () => {},
	resetPasswordForEmail: async () => {},
	signOut: async () => {},
	session: null,
	username: null,
	
});
