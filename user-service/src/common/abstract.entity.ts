import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Constructor } from '../types';
import type { AbstractDomain } from './abstract.domain';

export abstract class AbstractEntity<
  D extends AbstractDomain = AbstractDomain,
  O = never,
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

  private domainClass?: Constructor<D, [AbstractEntity, O?]>;

  toDomain(options?: O): D {
    const domainClass = this.domainClass;

    if (!domainClass) {
      throw new Error(
        `You need to use @UseDomain on class (${this.constructor.name}) be able to call toDomain function`,
      );
    }

    return new domainClass(this, options);
  }
}
