import { Document } from 'mongoose';
import { AxiosError, AxiosResponse } from 'axios';
import { Logger } from '@nestjs/common';
import { HttpHandleException } from '../exceptions/http-handle.exception';

export const convertToJson = (document: Document) =>
  document ? JSON.parse(JSON.stringify(document)) : document;

export const convertObjectToJson = (object) =>
  object ? JSON.parse(JSON.stringify(object)) : object;

export const mergeArrays = (
  arr1: Array<string> = [],
  arr2: Array<string> = [],
): Array<string> => [...new Set([...arr1, ...arr2])];

export const handleResponse = (response, data: Promise<any>) =>
  data
    .then((result) => response.status(200).send(result))
    .catch((err) => {
      throw new HttpHandleException(err);
    });

export const hendleAxiosResponse = (res: Promise<AxiosResponse<any, any>>) =>
  res
    .then((res) => {
      const { headers, method, url, data } = res.config;
      return typeof res.data == 'object'
        ? { http_response: { method, url, headers, data }, ...res.data }
        : { http_response: { method, url, headers, data }, response: res.data };
    })
    .catch((err) => {
      showAxiosErrors(err);
      // TODO: Crear la siguiente funcion para atrapar errores de Axios
      // throw new RequestNotAceptedError();
    });

const showAxiosErrors = (e: AxiosError) => {
  new Logger().error(`Request Axios Error`, 'ApiYStamping');
  new Logger().error(`Message error: ${e.message}`, 'ApiYStamping');
  new Logger().error(
    `Request to: [${e.config.method.toUpperCase()}] => ${e.config.url}`,
    'ApiYStamping',
  );
  new Logger().error(`Data send: ${e.config.data}`, 'ApiYStamping');
  new Logger().error(
    `Response: ${JSON.stringify(e.response.data)}`,
    'ApiYStamping',
  );
  new Logger().error(
    `Headers send: ${JSON.stringify(e.config.headers)}`,
    'ApiYStamping',
  );
};

export function enumToArray<T>(enumme: T): string[] {
  return Object.keys(enumme).map((key) => enumme[key]);
}
