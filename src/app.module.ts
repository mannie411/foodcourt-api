import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule, BrandModule, UserModule } from './api';
import { DatabaseModule } from './database/database.module';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, BrandModule],
  providers: [],
})
export class AppModule {}
