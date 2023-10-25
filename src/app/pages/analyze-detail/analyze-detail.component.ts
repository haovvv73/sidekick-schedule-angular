import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analyze-detail',
  templateUrl: './analyze-detail.component.html',
  styleUrls: ['./analyze-detail.component.css']
})
export class AnalyzeDetailComponent implements OnInit {
  fileName : string = ''

  constructor( private route : ActivatedRoute ){}

  ngOnInit(): void {
    this.fileName = this.route.snapshot.params['_id']
  }

}
