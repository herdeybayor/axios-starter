import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const baseUrl = "https://jsonplaceholder.typicode.com";

function App() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [todos, setTodos] = useState([]);

    const fetchUsers = useCallback(async (baseUrl: string) => {
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

    const fetchTodos = useCallback(async (baseUrl: string) => {
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            const res = await fetch(`${baseUrl}/todos`);
            const data = await res.json();
            setTodos(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log({ error });
            setErrorMessage(error?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers(baseUrl);
    }, [fetchUsers]);

    if (errorMessage) {
        return (
            <div className="h-screen bg-pink-500 text-white flex items-center justify-center">
                <p className="font-bold text-3xl text-center">{errorMessage}</p>
            </div>
        );
    }
    return (
        <div className="relative">
            {loading && (
                <div className="absolute inset-0 h-screen bg-black/50 text-white flex items-center justify-center">
                    <Loader2 size={120} className="animate-spin" />
                </div>
            )}
            <h1 className="text-3xl font-bold underline">Users</h1>
            <ul>
                {users.map((user: { id: number; name: string }) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

            <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={() => fetchTodos(baseUrl)}>
                Fetch Todos
            </button>

            <h1 className="text-3xl font-bold underline">Todos</h1>
            <ul>
                {todos.map((todo: { id: number; title: string }) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
