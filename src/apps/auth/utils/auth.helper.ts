import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { configLoader } from 'src/config/configs/env.configs';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto } from '../dto/create-token.dto';

@Injectable()
export class AuthHelper {
  constructor(private readonly jwtService: JwtService) {}

  genereteToken = (createTokenDto: CreateTokenDto) => {
    const token = this.jwtService.sign(createTokenDto);
    return token;
  };
}

export const matchOneItemArrays = (
  arr1: Array<string>,
  arr2: Array<string>,
) => {
  for (let i = 0; i < arr2?.length; i++) {
    if (arr1.includes(arr2[i])) return true;
  }
};

export const getTokenExpires = () => {
  const { jwt_expires_in } = configLoader().modules.auth;
  const token_expires_in = moment(Date.now())
    .add(jwt_expires_in, 'ms')
    .format();
  const result = Date.parse(token_expires_in) / 1000;
  return result;
};
