import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ArticleInputInterface } from '../../../../types/articleInput.interface';
import { BackendErrorsInterface } from '../../../../types/backendErrors.interface';

@Component({
  selector: 'mc-article-form',
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps: ArticleInputInterface;
  @Input('isSubmitting') isSubmittingProps: boolean;
  @Input('errors') errorsProps: BackendErrorsInterface | null;

  @Output('articleSubmit') articleSubmitEvent =
    new EventEmitter<ArticleInputInterface>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: this.initialValuesProps.title,
      description: this.initialValuesProps.description,
      body: this.initialValuesProps.body,
      tagList: this.initialValuesProps.tagList.join(' '),
    });
  }

  onSubmit(): void {
    this.articleSubmitEvent.emit(this.form.value);
  }
}
