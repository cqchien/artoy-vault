import { Controller, Get, Inject, OnModuleInit, Query } from '@nestjs/common';
import {
  GetAllUserRequest,
  GetAllUserServiceResponse,
  USER_SERVICE_NAME,
  UserServiceClient,
} from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin/users')
@ApiTags('Users')
export class UserController implements OnModuleInit {
  private userServiceClient!: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly grpcClient!: ClientGrpc;

  public onModuleInit() {
    this.userServiceClient =
      this.grpcClient.getService<UserServiceClient>(
        USER_SERVICE_NAME,
      );
  }

  @Get()
  async getAllUsers(): Promise<Observable<GetAllUserServiceResponse>> {
    const query: GetAllUserRequest = {
      take: 10,
      page: 1,
      q: 'c',
    };
    return this.userServiceClient.getAllUsers(query);
  }
}
