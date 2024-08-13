import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { AbstractDomain } from './abstract.domain';

export abstract class AbstractEntity<
  D extends AbstractDomain = AbstractDomain,
> {
  @PrimaryGeneratedColumn('uuid')
  id!: Uuid;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;

  abstract domainClass: new (entity: AbstractEntity) => D;

  toDomain(): D {
    const classDomain = this.domainClass;

    return new classDomain(this);
  }
}
