import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { BotService } from './bot.service';

@ApiTags('Bot')
@Controller('bot')
export class BotController {
  constructor(private readonly boService: BotService) {}
}
