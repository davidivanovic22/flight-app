import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-flight-information',
  templateUrl: './flight-information.component.html',
  styleUrls: ['./flight-information.component.scss']
})
export class FlightInformationComponent implements OnInit {
  flight!: Flight

  constructor(private dialogRef: MatDialogRef<FlightInformationComponent>, @Inject(MAT_DIALOG_DATA) private data: Flight) {
    if (data) {
      this.flight = data;
    }
  }

  ngOnInit(): void {
  }

}
