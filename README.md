import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeModel } from '../../Model/EmployeeModel';
import { ServiceService } from '../../Service/service.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as _ from 'lodash'
import { uniqBy } from 'lodash';

@Component({
  selector: 'app-table',
  standalone: false,
  
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit ,AfterViewInit {
  employeeData: any;
  public dataSource: any =[];
  public displayedColumns: string[]=["empid","name","city","contactNo","pincode","state","email","address","Action"]
  response: any=[];
  employeeList: EmployeeModel[]=[];   
  public list: any =[];
  data:any=[];
  uniqueStates: string[] = [];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(public service:ServiceService, public router:Router){
   
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    const oldData = localStorage.getItem("EmpData"); 
    if(oldData != null){
      // const parseData = JSON.parse(oldData);   
      const parseData:EmployeeModel[] = JSON.parse(oldData);   
      this.employeeList = parseData; 
      const tempArr: any[] = []; 
      // this.employeeList = uniqBy(parseData, 'state');
      // this.uniqueStates = [...new Set(this.employeeList.map((item) => item.state))];
      parseData.forEach((e) => {
        if(tempArr.includes(e.state))
        {
        }
        else{
          tempArr.push(e.state);
        }
      })
      this.uniqueStates = tempArr;
      console.log(this.uniqueStates,'data')
      console.log(tempArr,'arr');
      this.dataSource = new MatTableDataSource<EmployeeModel>(this.employeeList);
      // this.data = new MatTableDataSource(this.employeeList);
      // parseData = this.employeeList.reduce((a,b)=>{
      //   if(!a.find((b=>b.state)){
      //     console.log(a);
      //   }
      //   return a;
        
      // },[]);
      //  this.data = parseData.some((employee:any)=>{
      //   employee.state === this.employeeList.filter((x)=>(x.state===x.state));
      //   console.log(employee.state,'state')
      //   // console.log(this.data);
      // })
      // this.response = parseData;
      // console.log(this.employeeList,'list')
    }
    this.dataSource = new MatTableDataSource<EmployeeModel>(this.employeeList);
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
    // this.list = this.service.formData.state;
    console.log(this.dataSource,"data");
    console.log(this.dataSource.filteredData[0].state,"filterdata");
    }

  onEdit(element: EmployeeModel){
    this.service.formData = Object.assign({},element);
    this.router.navigate(['/form'])
  }

  onDelete(id:number){
    const isDelete = confirm("Do you wanna delete");
    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.empid==id);
      this.employeeList.splice(index,1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
      window.location.reload();
    }
  }
  
  filterChange(data:Event){
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  onChange($event:any){
    let filteredData = this.dataSource.filter((x:any)=>x.state == this.employeeList);
    this.dataSource = new MatTableDataSource(filteredData);
  }

  onReset(){
    this.dataSource = new MatTableDataSource<EmployeeModel>(this.employeeList);
    this.dataSource.paginator = this.paginator; 
    this.dataSource.sort = this.sort;
  }
}


