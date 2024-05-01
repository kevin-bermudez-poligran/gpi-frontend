export const joinDateAndTime = data => {
  const newData = {
    start_date: `${data.start_date} ${data.start_time_date}`,
    end_date: `${data.end_date} ${data.end_time_date}`
  };

  if (data.start_time_date.length < 8) {
    newData.start_date = `${newData.start_date}:00`;
  }

  if (data.start_time_date.length < 8) {
    newData.end_date = `${newData.end_date}:00`;
  }

  return newData;
};
