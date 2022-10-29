import {
  BadRequestException,
  InternalServerErrorException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export const handleGrpcError = (error: any) => {
  let err: any = {};
  try {
    err = JSON.parse(error.details);
  } catch (e) {
    if (error.details === 'No connection established') {
      throw new ServiceUnavailableException();
    }
    throw new InternalServerErrorException();
  }
  switch (err.statusCode) {
    case 401:
      throw new UnauthorizedException(err.message);
    case 400:
      throw new BadRequestException(err.message);
    default:
      console.log('statusCode', err);
      throw new InternalServerErrorException();
  }
};

export const throwGrpcError = (data: any) => {
  const jsonData = JSON.stringify(data);
  throw new RpcException(jsonData);
};
