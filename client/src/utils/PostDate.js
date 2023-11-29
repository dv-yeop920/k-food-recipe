const getDate = createdAt => {
  const newDate = new Date(createdAt);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const date = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  return {
    year,
    month,
    date,
    hours,
    minutes,
  };
};

export default getDate;
