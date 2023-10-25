import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-one-field',
  templateUrl: './dialog-one-field.component.html',
  styleUrls: ['./dialog-one-field.component.css']
})
export class DialogOneFieldComponent {

  value = ''

  constructor(
    public dialogRef: MatDialogRef<DialogOneFieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ){
    if(this.data){
      this.value = data
    }
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit():void{
    if(this.value){
      this.dialogRef.close(this.value);
    }
  }
}
