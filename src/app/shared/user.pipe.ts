import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../auth/user.modle';

@Pipe({
  name: 'user',
})
export class UserPipe implements PipeTransform {
  transform(user: User|null, ...args: unknown[]): string {
    if (user!=null){
      const email = user.email;
      const emailName = email.split('@')[0];
      const name = emailName.split(/[._]/)[0]
      const upperCased = name.charAt(0).toUpperCase() + name.slice(1);
      return upperCased;  
    }
    else{
      return ''
    }
  }
}
