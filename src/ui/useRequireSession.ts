import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useRequireSession() {
	const router = useRouter();
	const { data: sessionData } = useSession();

	if (!sessionData) {
		void router.push('/login');
	}
}
