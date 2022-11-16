import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TagService } from 'src/app/core/tag.service';
import { TagItem } from 'src/app/models';
import { CreateTagComponent } from 'src/app/shared/create-tag/create-tag.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  allTags$!: Observable<TagItem[] | null | undefined>;

  constructor(
    private _tagService: TagService,
    private _matDialog: MatDialog
  ) { 
    this.fetchTags();
  }
  
  ngOnInit(): void {
  }
  
  fetchTags() {
    this.allTags$ = this._tagService.allTags;
  }

  editTag(tag: TagItem) {
    const dialogRef = this._matDialog.open(CreateTagComponent, { panelClass: "full-view-dialog", data: tag });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  deleteTag(tag: TagItem) {
    this._tagService.deleteTag(tag);
  }
  
  trackByFn(index: number, item: object): number { 
    return index; 
  }


}
