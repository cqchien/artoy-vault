import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../../common/dto/page.dto';
import { ApiPageResponse, Auth } from '../../../decorators';
import { IUserService } from '../interfaces/user.service.inteface';
import { UserPaginationOptionsDto } from './dtos/request/users-pagination.dto';
import { UserDto } from './dtos/response/user.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: IUserService) {}

  @Get()
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiPageResponse({
    description: 'Get users list',
    type: PageDto,
  })
  async getUsers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UserPaginationOptionsDto,
  ): Promise<PageDto<UserDto>> {
    const [users, pageMetaDto] =
      await this.userService.getUsersWithPagination(pageOptionsDto);

    const responses = users.map((user) => new UserDto(user));

    return new PageDto<UserDto>(responses, pageMetaDto);
  }
}
