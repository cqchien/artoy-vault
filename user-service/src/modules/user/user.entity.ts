import { Column, Entity, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { UserDto } from './dtos/user.dto';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: true, type: 'varchar' })
  avatar!: string | null;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  email!: string;

  @Column({ nullable: false, type: 'varchar' })
  password!: string;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  createdBy?: UserEntity | null;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  updatedBy?: UserEntity | null;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  deletedBy?: UserEntity | null;
}
