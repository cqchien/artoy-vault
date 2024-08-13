import { Column, Entity, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../../../common/abstract.entity';
import { UserDomain } from '../../domains/user.domain';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDomain> {
  @Column({ nullable: true, type: 'varchar' })
  avatar!: string | null;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  email!: string;

  @Column({ nullable: false, type: 'varchar' })
  password!: string;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.id)
  createdBy?: UserEntity | null;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.id)
  updatedBy?: UserEntity | null;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.id)
  deletedBy?: UserEntity | null;

  domainClass = UserDomain;
}
