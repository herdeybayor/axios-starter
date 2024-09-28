import { useCallback, useEffect, useState } from "react";

export interface useQueryProps {
    url: string;
}

export function useQuery({ url }: useQueryProps) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState(null);

    const fetchQuery = useCallback(async () => {
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log({ error });
            setErrorMessage(error?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchQuery();
    }, [fetchQuery]);

    return { loading, errorMessage, data: data || [] };
}
