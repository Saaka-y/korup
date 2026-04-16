const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type ApiFetchOptions = RequestInit & {
    skipAuthRefresh?: boolean;
};

let refreshPromise: Promise<boolean> | null = null;

function buildHeaders(options: ApiFetchOptions): HeadersInit | undefined {
    const headers = new Headers(options.headers);
    const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

    if (options.body && !isFormData && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    return headers;
}

async function refreshAccessToken(): Promise<boolean> {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/custom_auth/jwt/refresh/`, {
                    method: "POST",
                    credentials: "include",
                });

                return response.ok;
            } catch (error) {
                console.error("Error refreshing access token:", error);
                return false;
            } finally {
                refreshPromise = null;
            }
        })();
    }

    return refreshPromise;
}

export async function apiFetch(url: string, options: ApiFetchOptions = {}): Promise<Response> {
    const { skipAuthRefresh = false, ...requestOptions } = options;
    const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
    const headers = buildHeaders(options);

    const response = await fetch(fullUrl, {
        ...requestOptions,
        credentials: "include",
        headers,
    });

    if (response.status !== 401 || skipAuthRefresh) {
        return response;
    }

    const refreshed = await refreshAccessToken();
    if (!refreshed) {
        return response;
    }

    return fetch(fullUrl, {
        ...requestOptions,
        credentials: "include",
        headers,
    });
}
