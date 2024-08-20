import { Controller, Inject, Query } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { PageDto } from '../../../common/dto/page.dto';
import { IUserService } from '../interfaces/user.service.inteface';
import { USER_SERVICE_NAME } from '../user.pb';
import { UserPaginationOptionsDto } from './dtos/request/users-pagination.dto';
import { UserDto } from './dtos/response/user.dto';

@Controller('admin/users')
export class UserController {
  constructor(
    @Inject('IUserService')
    private userService: IUserService,
  ) {}

  @GrpcMethod(USER_SERVICE_NAME, 'getAllUsers')
  async getAllUsers(
    @Query()
    pageOptionsDto: UserPaginationOptionsDto,
  ): Promise<PageDto<UserDto>> {
    const [users, pageMetaDto] =
      await this.userService.getUsersWithPagination(pageOptionsDto);

    const responses = users.map((user) => new UserDto(user));

    return new PageDto<UserDto>(responses, pageMetaDto);
  }
}
