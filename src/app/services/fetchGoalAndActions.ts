
export async function fetchGoalAndActions() {

    let goalAndActions = null;

    try {
        const res = await fetch(
            `http://localhost:8000/api/trajectory/latest_goal`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        goalAndActions = await res.json();
    } catch (error) {
        console.error("Error fetching latest goal and actions:", error);
    }
    return goalAndActions;
}
