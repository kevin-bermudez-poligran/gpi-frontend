import proxyBase from '../proxyBase';
import { joinDateAndTime } from './joinDateAndTime';

export const createSpecialistSchedule = data => {
  data = { ...data, ...joinDateAndTime(data) };

  return proxyBase()
    .post('/specialist-schedules', data)
    .then(result => result.data);
};
