import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ArticleFormModule } from '../shared/modules/articleForm/articleForm.module';
import { reducers } from './store/reducers';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { UpdateArticleEffect } from './store/effects/updateArticle.effect';
import { GetArticleEffect } from './store/effects/getArticle.effect';
import { EditArticleService } from './services/editArticle.service';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';
import { LoadingModule } from '../shared/modules/loading/loading.module';

const routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule,
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
