import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOneFieldComponent } from 'src/app/components/dialog-one-field/dialog-one-field.component';
import { FileInterface, Folder } from 'src/app/models/folder/folder.model';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent {

  currentFolder = ''
  currentFiles: FileInterface[] = []

  folder : Folder[] = [
    {
      ID:1,
      nameFolder:'Score HK1 2023',
      files:[
        {
          ID:1,
          fileName:'Math'
        },
        {
          ID:2,
          fileName:'Biology'
        },
        
      ]
    },
    {
      ID:2,
      nameFolder:'Math Student List',
      files:[
        {
          ID:3,
          fileName:'Semi'
        },
        {
          ID:4,
          fileName:'Final'
        },
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
        ID:99,
        nameFolder:nameFolder,
        files:[
          {
            ID:99,
            fileName:'new folder'
          },
        ]
      })
    })
  }

  onAddFile():void{
    this.openDialog((fileName : string)=>{
      let length = this.folder.length
      for(let i = 0;i <length; i++ ){
        let item = this.folder[i]
        // find folder
        if(item.nameFolder === this.currentFolder){
          item.files.push({
            ID:99,
            fileName
          })
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
    let allFiles : FileInterface[] = []
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
