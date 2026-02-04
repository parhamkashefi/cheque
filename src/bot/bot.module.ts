import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
