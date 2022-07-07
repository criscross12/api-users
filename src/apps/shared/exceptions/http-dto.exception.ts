import { HttpException, ValidationError } from '@nestjs/common';
import { HTTP_APP_ERROR } from '../errors/http-errors.error';

export class HttpExceptionDto {
  constructor(errors: ValidationError[], showDetails = false) {
    throw new HttpException(this.responseError(errors, showDetails), 400);
  }

  private getError = (e: string) => HTTP_APP_ERROR[e];

  private formatErrors = (errors: ValidationError[]) =>
    errors?.map((error) => this.getResponseError(error));

  private getMapErrors = (errorsKeys) =>
    errorsKeys
      .map((e) => this.getError(e))
      .filter((e) => e != null)
      .map((e) => {
        delete e.statusCode;
        return e;
      });

  private getResponseError = (error) =>
    Object({
      value: error.value,
      property: error.property,
      children: this.formatErrors(error.children),
      errors: this.getErrorsKeys(error),
    });

  private getErrorsKeys = (error) => {
    const errorsKeys = [];
    for (const key in error.constraints)
      errorsKeys.push(error.constraints[key]);
    return this.getMapErrors(errorsKeys);
  };

  private responseError = (errors, showDetails) => {
    const objError = {
      statusCode: 400,
      error: 'http.bad_request.error',
      message: 'Peticion Erronea',
    };
    if (showDetails) objError['children'] = this.formatErrors(errors);
    return objError;
  };
}
