import { useCallback, useEffect, useState } from "react";

export interface UseQueryProps {
    url: string;
    suspense?: boolean;
}

// Define the return types for Suspense and non-Suspense cases
type NonSuspenseReturn<T> = {
    loading: boolean;
    errorMessage: string;
    data: T | null;
};

type SuspenseReturn<T> = [
    () => Promise<void>, // fetchQuery function
    NonSuspenseReturn<T>
];

export function useQuery<T = any>({ url, suspense = false }: UseQueryProps): SuspenseReturn<T> | NonSuspenseReturn<T> {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState<T | null>(null);

    const fetchQuery = useCallback(async () => {
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate delay
            const res = await fetch(url);
            const result: T = await res.json(); // type the data as T
            setData(result);
        } catch (error: any) {
            console.log({ error });
            setErrorMessage(error?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        // only fetch if suspense is false
        if (!suspense) {
            fetchQuery();
        }
    }, [suspense, fetchQuery]);

    // Conditional return types based on suspense
    if (suspense) {
        return [fetchQuery, { loading, errorMessage, data }];
    } else {
        return { loading, errorMessage, data };
    }
}
