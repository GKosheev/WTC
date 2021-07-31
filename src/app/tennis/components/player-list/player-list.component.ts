import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ITableData} from "../../../shared/interfaces/i-table-data";






const PLAYERS: ITableData[] = [
  {
    name: 'gleb',
    phone: '-',
    email:'-',
    rating: '1'
  },
  {
    name: 'anton',
    phone: '-',
    email:'-',
    rating: '2'
  },
  {
    name: 'oleg',
    phone: '-',
    email: '-',
    rating: '3'
  },
  {
    name: 'eneg',
    phone: '-',
    email:'-',
    rating: '4'
  },
  {
    name: 'sergey',
    phone: '-',
    email:'-',
    rating: '5'
  },
  {
    name: 'aleg',
    phone: '-',
    email:'-',
    rating: '6'
  }
]


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements AfterViewInit, OnInit {

  //TODO player-list component TS

  constructor() {
    this.dataLoaded = false;

  }

  dataLoaded: boolean;
  displayedColumns: string[] = ['name', 'phone', 'email', 'rating'];
  dataSource = new  MatTableDataSource<ITableData>(PLAYERS);

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort = new MatSort();


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    //server logic implementation
    this.dataSource.data = PLAYERS;
    this.dataLoaded = true;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


