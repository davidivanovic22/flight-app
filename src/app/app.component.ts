import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FlightService} from "../assets/services/flight.service";
import {BehaviorSubject, interval, Subject, Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FlightInformationComponent} from "./flight-information/flight-information.component";

const MIN = 60000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'flight-app';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public selectedWorker: Subject<number>;
  subscription!: Subscription;


  constructor(private service: FlightService, private dialog: MatDialog) {
    // @ts-ignore
    this.selectedWorker = new Subject<number>();
  }

  displayedColumns: string[] = ['num', 'from', 'from_date',
    'to', 'to_date'];
  dataSource = new MatTableDataSource<Flight>([]);
  flightList: Flight[] = [];
  workerList: Worker[] = [];

  ngOnInit(): void {
    this.getAllWorkers();

    this.selectedWorker.subscribe(data => {
      if (data === null) {
        return;
      }

      this.getAllFlightByWorkerId(data);

      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.subscription = interval(MIN).subscribe(() => {
        this.getAllFlightByWorkerId(data);
      })
    });

  }

  getAllWorkers() {
    this.service.getAllWorkers().subscribe(data => {
      this.workerList = data;
      this.selectedWorker.next(data[0].id);
    })
  }

  getAllFlightByWorkerId(workerId: number) {
    this.service.getAllFlightByWorkerId(workerId).subscribe(data => {
      this.flightList = data;
      this.dataSource = new MatTableDataSource<Flight>(this.flightList)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  openDialog(flight: Flight) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "50%";
    dialogConfig.data = flight

    this.dialog.open(FlightInformationComponent, dialogConfig);
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
