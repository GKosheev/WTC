import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TableData} from "../../models/interfaces/UsersData";
import {UsersService} from "../../services/users/users.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth/auth.service";


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements AfterViewInit, OnInit {

  constructor(private router: Router,
              private tableService: UsersService,
              private authService: AuthService) {
    this.dataLoaded = false;
  }

  memberID: string = ''
  dataLoaded: boolean;
  displayedColumns: string[] = ['fullName', 'phone', 'email', 'rating', 'message'];
  dataSource = new MatTableDataSource<TableData>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit() {
    this.tableService.loadTableData().subscribe(data => {
      this.dataSource.data = data
      this.authService.getUser().subscribe(user => {
        if (user)
          this.memberID = user?.profile.memberID

        this.dataLoaded = true;
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToSendEmail(id: string) {
    if (this.memberID !== id)
      this.router.navigate(['private/user/players/' + id])
    else
      this.router.navigate(['private/user/profile'])
  }
}


