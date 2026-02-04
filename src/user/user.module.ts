import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { ChequeModule } from 'src/cheque/cheque.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => ChequeModule),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
