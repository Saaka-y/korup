type FetchLatestReportProps = {
    id: number;
};

export async function fetchLatestReport({ id }: FetchLatestReportProps) {

    let report = null;

    try {
        const res = await fetch(
            `http://localhost:8000/api/trajectory/latest_report/${id}`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        report = await res.json();
        console.log("Latest report:", report);
    } catch (error) {
        console.error("Error fetching latest report:", error);
    }
    return report;
}
