import { Module } from '@nestjs/common';
import { AuthModule, BrandModule, UserModule, RootController } from './api';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, BrandModule],
  controllers: [RootController],
})
export class AppModule {}
