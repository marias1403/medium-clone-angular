import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import {
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
  updateCurrentUserAction,
} from '../actions/updateCurrentUser.action';

@Injectable()
export class UpdateCurrentUserEffect {
  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCurrentUserAction),
      switchMap(({ currentUserInput }) => {
        return this.authService.updateCurrentUser(currentUserInput).pipe(
          map((currentUser: CurrentUserInterface) => {
            return updateCurrentUserSuccessAction({ currentUser });
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateCurrentUserFailureAction({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
