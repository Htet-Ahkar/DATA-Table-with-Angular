import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  elementId: 'name' | 'nrc' | 'location';
  elementInnerText: string;
  photo: string;
  nrcCard: string;
  location: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data);
  }

  ngOnInit(): void {}
}
