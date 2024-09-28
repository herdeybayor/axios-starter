import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const baseUrl = "https://jsonplaceholder.typicode.com";

function App() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [users, setUsers] = useState([]);

    const fetchPhotos = useCallback(async (baseUrl: string) => {
        try {
            setLoading(true);
            // await new Promise((resolve) => setTimeout(resolve, 3000));
            const res = await fetch(`${baseUrl}/users`);
            const data = await res.json();
            setUsers(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log({ error });
            setErrorMessage(error?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPhotos(baseUrl);
    }, [fetchPhotos]);

    if (loading) {
        return (
            <div className="h-screen bg-pink-500 text-white flex items-center justify-center">
                <Loader2 size={120} className="animate-spin" />
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="h-screen bg-pink-500 text-white flex items-center justify-center">
                <p className="font-bold text-3xl text-center">{errorMessage}</p>
            </div>
        );
    }
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Users</h1>
            <ul>
                {users.map((user: { id: number; name: string }) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
