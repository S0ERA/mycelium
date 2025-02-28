export const getBarLineData = (data) => {
    return {
        labels: data.map((p) => p.id),
        datasets: [
            {
                label: "Лайки",
                data: data.map((p) => p.reactions.likes),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                borderColor: "rgb(53, 162, 235)",
            },
            {
                label: "Дизлайки",
                data: data.map((p) => p.reactions.dislikes),
                backgroundColor: "rgba(74, 252, 88, 0.5)",
                borderColor: "rgb(74, 252, 88)",
            },
            {
                label: "Просмотры",
                data: data.map((p) => p.views),
                backgroundColor: "rgba(252, 74, 88, 0.5)",
                borderColor: "rgb(252, 74, 88)",
            },
        ],
    };
};