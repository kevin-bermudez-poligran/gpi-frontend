import proxyBase from '../proxyBase';
import { joinDateAndTime } from './joinDateAndTime';

export const updateSpecialistSchedule = (id, data) => {
  data = { ...data, ...joinDateAndTime(data) };

  return proxyBase()
    .put('/specialist-schedules/' + id, data)
    .then(result => result.data);
};
