import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './reducers';
import {Logout} from './auth/auth.actions';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(
      map(state => (state as any).auth.loggedIn)
    );
    this.isLoggedOut$ = this.store.pipe(
      map(state => !(state as any).auth.loggedIn)
    );
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
