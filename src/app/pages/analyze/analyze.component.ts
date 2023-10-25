import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOneFieldComponent } from 'src/app/components/dialog-one-field/dialog-one-field.component';

interface Folder{
  nameFolder : string,
  files:string[]
}

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent {

  currentFolder = ''
  currentFiles: string[] = []

  folder : Folder[] = [
    {
      nameFolder:'Schedule',
      files:[
        'schedule 1',
        'schedule 2',
        'schedule 3',
        'schedule 4',
      ]
    },
    {
      nameFolder:'lesson',
      files:[
        'lesson 1',
        'lesson 2',
        'lesson 4',
      ]
    },
    {
      nameFolder:'semester',
      files:[
        'semester 1',
        'semester 2',
        'semester 3',
      ]
    }
  ]

  constructor(public dialog: MatDialog){
    this.onViewAllFolder()
  }

  // remind unsubscribe next implement api
  openDialog( callback:(s1:string)=>void ):void{
    const dialogRef = this.dialog.open(DialogOneFieldComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        callback(result)
      }
    });
  }
  // remind unsubscribe next implement api
  openDialogEdit( nameFolder:string, callback:(s1:string)=>void ){
    const dialogRef = this.dialog.open(DialogOneFieldComponent, {
      data: nameFolder,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){ 
        callback(result)
      }
    });
  }

  onCreateFolder(): void{  
    this.openDialog((nameFolder : string)=>{
      this.folder.push({
        nameFolder:nameFolder,
        files:[
          'File 1'
        ]
      })
    })
  }

  onAddFile():void{
    this.openDialog((nameFile : string)=>{
      let length = this.folder.length
      for(let i = 0;i <length; i++ ){
        let item = this.folder[i]
        // find folder
        if(item.nameFolder === this.currentFolder){
          item.files.push(nameFile)
          break;
        }
      }
    })
  }

  onViewFolder(folder : Folder):void{
    this.currentFolder = folder.nameFolder
    this.currentFiles = folder.files
  }

  onViewAllFolder():void{
    let allFiles : string[] = []
    this.folder.map(item=>{
      allFiles.push(...item.files)
    })

    this.currentFolder = 'All Folder'
    this.currentFiles = allFiles
  }

  onEditFolder(){
    this.openDialogEdit(this.currentFolder,(newNameFolder:string)=>{
      let length = this.folder.length
      for(let i = 0;i <length; i++ ){
        let item = this.folder[i]
        if(item.nameFolder === this.currentFolder){
          item.nameFolder = newNameFolder
          this.currentFolder = newNameFolder
          break;
        }
      }
    })
  }

  onDeleteFolder(){
    this.folder = this.folder.filter((item)=>item.nameFolder !== this.currentFolder)
    this.onViewAllFolder()
  }

}
