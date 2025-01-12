import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";

import { useQuery } from "./hooks/use-query";
import { $http } from "./http/xhr";
import { ApiV1AuthRegister } from "./http";

const baseUrl = "https://jsonplaceholder.typicode.com";

// async function createUser() {
//     const payload = { id: "20", name: "Musk" };
//     const res = await fetch("https://jsonplaceholder.typicode.com/users", {
//         method: "POST",
//         body: JSON.stringify(payload)
//     });
//     return await res.json();
// }

async function createUser() {
    const payload = { id: "20", name: "Musk" };
    const res = await ApiV1AuthRegister(payload);
    return res.data;
}

function App() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [todos, setTodos] = useState([]);

    const { data: users, errorMessage: userError, loading: loadingUser } = useQuery({ url: `${baseUrl}/users` });

    const fetchTodos = useCallback(async (baseUrl: string) => {
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            const { data } = await axios.get(`${baseUrl}/todos`);
            setTodos(data);
        } catch (error: any) {
            console.log({ error });
            setErrorMessage(error?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    if (loadingUser) {
        return (
            <div className="h-screen bg-pink-500 text-white flex items-center justify-center">
                <Loader2 size={120} className="animate-spin" />
            </div>
        );
    }

    if (userError) {
        return (
            <div className="h-screen bg-pink-500 text-white flex items-center justify-center">
                <p className="font-bold text-3xl text-center">Failed to load User: {errorMessage}</p>
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
                {users?.map((user: { id: number; name: string }) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

            <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={() => fetchTodos(baseUrl)}>
                Fetch Todos
            </button>

            <h1 className="text-3xl font-bold underline">Todos</h1>
            <ul>
                {todos?.map((todo: { id: number; title: string }) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
