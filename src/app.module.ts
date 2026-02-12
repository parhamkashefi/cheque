import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChequeModule } from './cheque/cheque.module';
import { UserModule } from './user/user.module';
import { BotModule } from './bot/bot.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI_DOCKER'),

        connectionFactory: (connection) => {
          connection.on('connected', () =>
            console.log('✅ Mongoose connected to:', connection.host),
          );

          connection.on('error', (err) =>
            console.error('❌ Mongoose connection error:', err),
          );
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    ChequeModule,
    UserModule,
    BotModule,
    AuthModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
