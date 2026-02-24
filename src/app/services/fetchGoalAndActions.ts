type FetchGoalAndActionsProps = {
    id: number;
};

export async function fetchGoalAndActions({ id }: FetchGoalAndActionsProps) {

    let goalAndActions = null;

    try {
        const accessToken = localStorage.getItem("access_token");
        const res = await fetch(
            `http://localhost:8000/api/trajectory/latest_goal/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        goalAndActions = await res.json();
        console.log("Latest goal and actions:", goalAndActions);
    } catch (error) {
        console.error("Error fetching latest goal and actions:", error);
    }
    return goalAndActions;
}
