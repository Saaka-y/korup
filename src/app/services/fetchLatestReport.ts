type FetchLatestReportProps = {
    id: number;
};

export async function fetchLatestReport({ id }: FetchLatestReportProps) {

    let report = null;

    try {
        const accessToken = localStorage.getItem("access_token");
        const res = await fetch(
            `http://localhost:8000/api/trajectory/latest_report/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
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
