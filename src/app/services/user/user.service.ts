import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from '../../interfaces/user';


@Injectable()
export class UserService {
  users: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.users = this.db.list('/users');
  }

  getUsers(): FirebaseListObservable<any>{
    this.users = this.db.list('/users');
    return this.users;
  }

  addUser(user:User) {
    this.users.push(this.convertUser(user));
  }

  updateUser(key: string, user:User) {
    this.users.update(key, this.convertUser(user));
  }

  deleteUser(key: string) {
    this.users.remove(key);
  }

  deleteAll() {
    this.users.remove();
  }

  // convert date to string, Firebase cannot save Date object!
  private convertUser(user:User): Object {
    let obj = {};
    for (let prop in user) {
      if (prop === 'birthday'){
        obj[prop] = user[prop].toUTCString();
      } else {
        obj[prop] = user[prop];
      }
    }
    return obj;
  }

}
