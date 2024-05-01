import proxyBase from '../proxyBase';

export const deleteSpecialistSchedule = specialist_schedule => {
  return proxyBase()
    .delete('/specialist-schedules/' + specialist_schedule)
    .then(result => result.data?.data);
};
