import { Component, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';
// TODO: このあと作成
import { UserDetailUsecase } from '../../usecase/user-detail.usecase';
import { User } from '../../user';

@Component({
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css'],
})
export class UserDetailPageComponent implements OnDestroy {
  private onDestroy$ = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private userDetailUsecase: UserDetailUsecase
  ) {
    this.route.params
      .pipe(
        // コンポーネントの破棄と同時に停止する
        takeUntil(this.onDestroy$),
        // paramsからuserIdを取り出す
        map((params) => params['userId']),
        // userIdが変わったときだけ値を流す
        distinctUntilChanged()
      )
      .subscribe((userId) => {
        // ユーザーIDを使った処理を記述する
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
