import { Document } from 'mongoose';

export const parseDocument = (document: Document) =>
  document ? JSON.parse(JSON.stringify(document)) : document;

export const removeRepeat = (list: Array<string>): Array<string> => [
  ...new Set(list),
];
