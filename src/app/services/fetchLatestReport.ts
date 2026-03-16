

export async function fetchLatestReport() {

    let report = null;

    try {
        const res = await fetch(
            `http://localhost:8000/api/trajectory/latest_report`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        report = await res.json();
    } catch (error) {
        console.error("Error fetching latest report:", error);
    }
    return report;
}
