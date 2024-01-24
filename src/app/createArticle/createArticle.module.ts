import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ArticleFormModule } from '../shared/modules/articleForm/articleForm.module';

const routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent,
  },
];

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ArticleFormModule],
})
export class CreateArticleModule {}
