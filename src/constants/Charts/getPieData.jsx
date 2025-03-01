export const getPieData = (data) => {
  const { totalLikes, totalDislikes, totalViews } = data.reduce(
      (acc, p) => {
        acc.totalLikes += p.reactions.likes;
        acc.totalDislikes += p.reactions.dislikes;
        acc.totalViews += p.views;
        return acc;
      },
      { totalLikes: 0, totalDislikes: 0, totalViews: 0 }
  );

  return {
    labels: ["Лайки", "Дизлайки", "Просмотры"],
    datasets: [
      {
        data: [totalLikes, totalDislikes, totalViews],
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