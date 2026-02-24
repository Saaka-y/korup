type FetchGoalAndActionsProps = {
    id: number;
};

export async function fetchGoalAndActions({ id }: FetchGoalAndActionsProps) {

    let goalAndActions = null;

    try {
        const res = await fetch(
            `http://localhost:8000/api/trajectory/latest_goal/${id}`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
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
