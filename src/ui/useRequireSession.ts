import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

export function useRequireSession() {
	const router = useRouter();
	const { data: sessionData } = useSession();

	React.useEffect(() => {
		if (!sessionData) {
			void router.push('/login');
		}
	}, [sessionData, router]);
}
