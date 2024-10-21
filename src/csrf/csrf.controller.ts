/* eslint-disable prettier/prettier */
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';


@Controller('csrf')
export class CsrfController {
  @Get()
  getCsrfToken(@Req() request: Request) {
    return { csrfToken: request.csrfToken() };
  }
}