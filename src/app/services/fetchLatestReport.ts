
import { apiFetch } from "@/app/services/api-client";


export async function fetchLatestReport() {

    let report = null;

    try {
        const res = await apiFetch("/api/trajectory/latest_report", {
            method: "GET",
        });
        report = await res.json();
    } catch (error) {
        console.error("Error fetching latest report:", error);
    }
    return report;
}
