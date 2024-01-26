import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { CreateArticleService } from '../../services/createArticle.service';
import {
  createArticleSuccessAction,
  createArticleFailureAction,
  createArticleAction,
} from '../actions/createArticle.action';
import { ArticleInterface } from '../../../shared/types/article.interface';

@Injectable()
export class CreateArticleEffect {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({ articleInput }) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: ArticleInterface) => {
            return createArticleSuccessAction({ article });
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleFailureAction({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    ),
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router,
  ) {}
}
