import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './infras/entities/user.entity';
import { UserSettingsEntity } from './user-settings.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserSettingsEntity])],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
