export const fetcher = async (url: string, options?: RequestInit) => {
    return await (await fetch(url, options)).json();
};
