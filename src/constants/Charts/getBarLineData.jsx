export const getBarLineData = (data) => {
  const mappedData = data.map((p) => ({
    id: p.id,
    likes: p.reactions.likes,
    dislikes: p.reactions.dislikes,
    views: p.views,
  }));

  const id = mappedData.map((item) => item.id);
  const likes = mappedData.map((item) => item.likes);
  const dislikes = mappedData.map((item) => item.dislikes);
  const views = mappedData.map((item) => item.views);

  return {
    labels: id,
    datasets: [
      {
        label: "Лайки",
        data: likes,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
      },
      {
        label: "Дизлайки",
        data: dislikes,
        backgroundColor: "rgba(74, 252, 88, 0.5)",
        borderColor: "rgb(74, 252, 88)",
      },
      {
        label: "Просмотры",
        data: views,
        backgroundColor: "rgba(252, 74, 88, 0.5)",
        borderColor: "rgb(252, 74, 88)",
      },
    ],
  };
};
