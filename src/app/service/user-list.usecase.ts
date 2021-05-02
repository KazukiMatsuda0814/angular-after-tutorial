import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from './store.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  get users$() {
    return (
      this.store
        // state.userListに変更があった時だけ後続のpipeが実行される
        .select((state) => state.userList)
        .pipe(
          map(({ items, filter }) =>
            items.filter((user) => {
              (user.first_name + user.last_name).includes(filter.nameFilter);
            })
          )
        )
    );
  }

  get filter$() {
    return this.store.select((state) => state.userList.filter);
  }

  constructor(private http: HttpClient, private store: Store) {}

  async fetchUsers() {
    const users = await this.http
      .get<{ data: User[] }>('https://reqres.in/api/users')
      .pipe(map((resp) => resp.data))
      .toPromise();

    this.store.update((state) => ({
      ...state,
      userList: {
        ...state.userList,
        items: users,
      },
    }));
  }

  setNameFilter(nameFilter: string) {
    this.store.update((state) => ({
      ...state,
      userList: {
        ...state.userList,
        filter: {
          nameFilter,
        },
      },
    }));
  }
}
