import { Document } from 'mongoose';

export const parseDocument = (document: Document) =>
  document ? JSON.parse(JSON.stringify(document)) : document;

export const removeRepeat = (list: Array<string>): Array<string> => [
  ...new Set(list),
];

export const GetAge = (FN) => {
  const today: any = new Date();
  const current_year = parseInt(today.getFullYear());
  const current_month = parseInt(today.getMonth() + 1);
  const current_day = parseInt(today.getDate());

  const yearday = parseInt(String(FN).substring(0, 4));
  const monthday = parseInt(String(FN).substring(5, 7));
  const birthday = parseInt(String(FN).substring(8, 10));

  let age = current_year - yearday;
  if (current_month < monthday) {
    age--;
  } else if (current_month === monthday) {
    if (current_day < birthday) {
      age--;
    }
  }
  return age;
};
