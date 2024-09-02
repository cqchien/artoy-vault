import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE_NAME, USER_SERVICE_PACKAGE_NAME } from './user.pb';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: USER_SERVICE_PACKAGE_NAME,
          protoPath: join(
            'node_modules/@cqchien/artoy-vault-service-protos/dist/src/proto/user-service/user.proto',
          ),
          url: `0.0.0.0:3000`,
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
