import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeList: employeeModel[] = [];
  displayedColumns: string[] = ['name', 'state', 'position']; // Adjust these columns
  dataSource = new MatTableDataSource<employeeModel>([]);
  uniqueStates: string[] = []; // For dropdown options

  ngOnInit(): void {
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);

      // Remove duplicate state entries
      this.employeeList = _.uniqBy(parseData, 'state');

      // Extract unique states for dropdown
      this.uniqueStates = [...new Set(this.employeeList.map((item) => item.state))];

      // Set the filtered employee list to the datasource
      this.dataSource = new MatTableDataSource(this.employeeList);
    }
  }

  onChange(event: any): void {
    const selectedState = event.value;

    // Filter data based on selected state
    const filteredData = _.filter(this.employeeList, (item) => item.state === selectedState);

    // Update the table's dataSource
    this.dataSource = new MatTableDataSource(filteredData);
  }
}


<div>
  <mat-form-field appearance="fill">
    <mat-select placeholder="Select State" (selectionChange)="onChange($event)">
      <mat-option *ngFor="let state of uniqueStates" [value]="state">{{ state }}</mat-option>
    </mat-select>
  </mat-form-field>

  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

    <!-- Name Column -->
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> Name </th>
      <td mat-cell *matCellDef="let element"> {{ element.name }} </td>
    </ng-container>

    <!-- State Column -->
    <ng-container matColumnDef="state">
      <th mat-header-cell *matHeaderCellDef> State </th>
      <td mat-cell *matCellDef="let element"> {{ element.state }} </td>
    </ng-container>

    <!-- Position Column -->
    <ng-container matColumnDef="position">
      <th mat-header-cell *matHeaderCellDef> Position </th>
      <td mat-cell *matCellDef="let element"> {{ element.position }} </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
</div>
