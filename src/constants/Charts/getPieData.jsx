export const getPieData = (data) => {
    return {
        labels: ["Лайки", "Дизлайки", "Просмотры"],
        datasets: [
            {
                data: [
                    data.reduce((acc, p) => acc + p.reactions.likes, 0),
                    data.reduce((acc, p) => acc + p.reactions.dislikes, 0),
                    data.reduce((acc, p) => acc + p.views, 0),
                ],
                backgroundColor: [
                    "rgba(74, 88, 252, 0.5)",
                    "rgba(74, 252, 88, 0.5)",
                    "rgba(252, 74, 88, 0.5)",
                ],
                borderColor: [
                    "rgb(74, 88, 252)",
                    "rgb(74, 252, 88)",
                    "rgb(252, 74, 88)",
                ],
            },
        ],
    };
};