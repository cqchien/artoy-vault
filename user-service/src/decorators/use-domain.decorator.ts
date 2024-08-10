import type { Constructor } from '../types';

export function UseDomain(domainClass: Constructor): ClassDecorator {
  return (ctor) => {
    if (!(domainClass as unknown)) {
      throw new Error('UseDomain decorator requires domainClass');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ctor.prototype.domainClass = domainClass;
  };
}
