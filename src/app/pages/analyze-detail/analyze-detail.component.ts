import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogOneFieldComponent } from 'src/app/components/dialog-one-field/dialog-one-field.component';
import { statusFile } from 'src/app/enums/statusFile.enum';
import { DataLesson } from 'src/app/models/folder/dataLesson.model';
import { DataStudent } from 'src/app/models/folder/dataStudent.model';
import { File } from 'src/app/models/folder/file.model';

interface StatusFileButton {
  label: string,
  status: statusFile,
  description: string
}

@Component({
  selector: 'app-analyze-detail',
  templateUrl: './analyze-detail.component.html',
  styleUrls: ['./analyze-detail.component.css']
})
export class AnalyzeDetailComponent implements OnInit {
  currentFile: File | undefined
  displayedColumnsStudent: string[] = ['ID', 'nameStudent', 'score', 'action']
  displayedColumnsLesson: string[] = ['ID', 'nameLesson', 'indexLesson', 'score', 'action']
  dataSourceStudent: DataStudent[] = []
  dataSourceLesson: DataLesson[] = []

  statusFileButton: StatusFileButton[] = [
    {
      label: 'lesson',
      status: statusFile.lesson,
      description: '*lesson is for who want manager lesson',
    },
    {
      label: 'member',
      status: statusFile.member,
      description: '*member is for who want manager student/member',
    },
  ]

  files: File[] = [
    {
      ID: 1,
      nameFile: 'Math',
      statusFile: null,
      data: [
        {
          ID: 'MTH20109',
          nameLesson: 'Abstract Math',
          indexLesson: 3,
          score: 8.5
        }
      ]
    },
    {
      ID: 2,
      nameFile: 'Biology',
      statusFile: statusFile.lesson,
      data: [
        {
          ID: 'MTH20108',
          nameLesson: 'Abstract Biology',
          indexLesson: 2,
          score: 9.5
        }
      ]
    },
    // ----
    {
      ID: 3,
      nameFile: 'Semi',
      statusFile: statusFile.member,
      data: [
        {
          ID: '20110184',
          nameStudent: 'Vo Tran Gia Hao',
          score: 8.5
        }
      ]
    },
    {
      ID: 4,
      nameFile: 'Final',
      statusFile: statusFile.member,
      data: [
        {
          ID: '20110184',
          nameStudent: 'Vo Tran Gia Hao',
          score: 8.5
        }
      ]
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getFile()
  }

  getFile() {
    try {
      //try parse
      const fileID = parseInt(this.route.snapshot.params['_id'])
      if (isNaN(fileID)) throw new Error('Invalid ID')

      // find
      const fileResult = this.files.find(file => {
        return file.ID === fileID
      })

      // check
      if (fileResult) {
        this.currentFile = fileResult
        // render
        switch (fileResult.statusFile) {
          case statusFile.lesson:
            this.dataSourceLesson = fileResult.data as DataLesson[]
            break;
          case statusFile.member:
            this.dataSourceStudent = fileResult.data as DataStudent[]
            break;
        }

      }
    } catch (error) {
      this.router.navigate(['notfound'])
    }

  }

  onSetStatusFile(value: statusFile) {
    const ID = this.currentFile?.ID
    if (ID) {
      // find
      const fileResult = this.files.find(file => {
        return file.ID === ID
      })

      if (!fileResult || !this.currentFile) return
      // update db
      fileResult.statusFile = value
      // update current file
      this.getFile()
    }
  }

  openDialogEditFileName(nameFile: string, callback: (s1: string) => void) {
    const dialogRef = this.dialog.open(DialogOneFieldComponent, {
      data: nameFile,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callback(result)
      }
    });
  }

  onEditFileName() {
    // find 
    const fileResullt = this.files.find(item => item.ID === this.currentFile?.ID)
    
    // update db
    if (!fileResullt) return
    this.openDialogEditFileName(fileResullt.nameFile,(newFileName)=>{
      fileResullt.nameFile = newFileName
    })
    // update view
    this.getFile()
  }

  onDeleteFileName() {
    // filter == remove
    this.files = this.files.filter(item=> item.ID !== this.currentFile?.ID)
    // update view
    this.router.navigate(['/analyze'])
  }

  onExportExcelFile() {

  }

  onImportExcelFile() {

  }

  onAddRecord() {

  }

  onEditRecord() {

  }

  onDeleteRecord() {

  }
}
