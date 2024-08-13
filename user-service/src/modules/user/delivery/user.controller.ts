import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../../common/dto/page.dto';
import { ApiPageResponse } from '../../../decorators/api-page-response.decorator';
import { IUserService } from '../interfaces/user.service.inteface';
import { UserPaginationOptionsDto } from './dtos/request/users-pagination.dto';
import { UserDto } from './dtos/response/user.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject('IUserService')
    private userService: IUserService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPageResponse({
    description: 'Get list users',
    type: UserDto,
  })
  async getUsers(
    @Query()
    pageOptionsDto: UserPaginationOptionsDto,
  ): Promise<PageDto<UserDto>> {
    const [users, pageMetaDto] =
      await this.userService.getUsersWithPagination(pageOptionsDto);

    const responses = users.map((user) => new UserDto(user));

    return new PageDto<UserDto>(responses, pageMetaDto);
  }
}
