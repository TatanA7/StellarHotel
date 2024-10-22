/* eslint-disable prettier/prettier */
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { renderVoyagerPage } from 'graphql-voyager/middleware';

@Controller('voyager')
export class VoyagerController {
  @Get()
  voyager(@Res() res: Response) {
    res.send(renderVoyagerPage({
      endpointUrl: '/graphql', 
    }));
  }
}