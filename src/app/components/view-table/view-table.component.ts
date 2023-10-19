import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css']
})
export class ViewTableComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewTableComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
