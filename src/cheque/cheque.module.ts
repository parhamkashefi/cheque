import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChequeService } from './cheque.service';
import { ChequeController } from './cheque.controller';
import { Cheque, ChequeSchema } from './schema/cheque.schema';
import { BotModule } from 'src/bot/bot.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cheque.name, schema: ChequeSchema }]),
    BotModule,
    forwardRef(() => UserModule),
  ],
  controllers: [ChequeController],
  providers: [ChequeService],
  exports: [ChequeService],
})
export class ChequeModule {}
