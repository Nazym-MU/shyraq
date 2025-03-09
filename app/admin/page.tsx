import { redirect } from 'next/navigation';
import { isAdmin } from '../../lib/admin';
import ClientWrapper from './client-wrapper';

export default async function AdminPage() {

    const admin = await isAdmin();

    if (!admin) {
        redirect("/");
    }

    return <ClientWrapper />;
};
