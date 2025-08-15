import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) return <p>Please login to access this page.</p>;

    return <h1>Welcome, {session.user?.email}</h1>;
}
