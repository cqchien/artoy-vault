import { UserPaginationOptionsDto } from './dtos/request/users-pagination.dto';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  OnModuleInit,
  Query,
} from '@nestjs/common';
import {
  GetAllUserRequest,
  GetAllUserServiceResponse,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '../user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos/response/user.dto';
import { ApiPageResponse } from '../../decorators/api-response.decorator';

@Controller('admin/users')
@ApiTags('Users')
export class UserController implements OnModuleInit {
  private userServiceClient!: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly grpcClient!: ClientGrpc;

  public onModuleInit() {
    this.userServiceClient =
      this.grpcClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPageResponse({
    description: 'Get list users',
    type: UserDto,
  })
  async getAllUsers(
    @Query() pageOptionsDto: UserPaginationOptionsDto,
  ): Promise<Observable<GetAllUserServiceResponse>> {
    const query: GetAllUserRequest = {
      take: pageOptionsDto.take,
      page: pageOptionsDto.page,
      q: pageOptionsDto.q || '',
    };
    return this.userServiceClient.getAllUsers(query);
  }
}
