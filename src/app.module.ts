import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve('./config/.env.development'),
      isGlobal: true,
    }),
    AuthenticationModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI as string, { serverSelectionTimeoutMS: 5000 }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

