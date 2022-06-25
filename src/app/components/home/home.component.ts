import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { DialogComponent } from '../dialog/dialog.component';

import { MatDialog } from '@angular/material/dialog';

// DATA
import { DATA } from '../../../constants/DATA';

export interface DATA_Type {
  id: number;
  name: string;
  nrc: string;
  location: string;
  role: string;
  photo: string;
  nrcCard: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'nrc', 'location', 'role'];
  dataSource = new MatTableDataSource<DATA_Type>(DATA);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  openDialog(event: Event) {
    let elementId: string = (event.target as Element).id;
    let elementInnerText: string = (event.target as HTMLElement).innerText;
    let photo;
    let nrcCard;
    let location;

    DATA.map((data) => {
      if (elementInnerText === data.name) {
        photo = data.photo;
      }
      if (elementInnerText === data.nrc) {
        nrcCard = data.nrcCard;
      }
      if (elementInnerText === data.location) {
        location = data.location;
      }
    });

    this.dialog.open(DialogComponent, {
      data: {
        elementId,
        photo,
        nrcCard,
        location,
        elementInnerText,
      },
    });
  }
}
