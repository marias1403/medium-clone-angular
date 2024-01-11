import { Component, Input } from '@angular/core';

import { PopularTagType } from '../../../../types/popularTag.type';

@Component({
  selector: 'mc-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent {
  @Input('tags') tagsProps: PopularTagType[];
}
