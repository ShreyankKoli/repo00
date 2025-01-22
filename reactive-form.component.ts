import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from '../../Model/Employee';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../Service/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reactive-form',
  standalone: false,
  
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent implements OnInit {
  public dataSource: any =[];
  public displayedColumns: string[]=["empid","name","city","contactNo","pincode","state","email","address","Action"]
  employeeForm : FormGroup = new FormGroup({});
  employeeList: EmployeeModel[]=[]
  employeeObj: EmployeeModel = new EmployeeModel();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(public formBuilder: FormBuilder, public service: ServiceService, public router:Router){
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null)
    {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
    this.dataSource = new MatTableDataSource<EmployeeModel>(this.employeeList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }

 createForm(){
  this.employeeForm = new FormGroup({
    empid: new FormControl(this.employeeObj.empid),
    name:new FormControl(this.employeeObj.name,[Validators.required]),
    city: new FormControl(this.employeeObj.city,[Validators.required]),
    contactNo: new FormControl(this.employeeObj.contactNo,[Validators.required]),
    pincode: new FormControl(this.employeeObj.pincode,[Validators.required]),
    state: new FormControl(this.employeeObj.state,[Validators.required]),
    email:new FormControl(this.employeeObj.email,[Validators.required,Validators.email]),
    address: new FormControl(this.employeeObj.address,[Validators.required])
  })
 }

  ngOnInit(): void {

  }

  onUpdate(){
    const record = this.employeeList.find(m=>m.empid == this.employeeForm.controls['empid'].value);
    if(record != undefined){
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.pincode = this.employeeForm.controls['pincode'].value;
      record.email = this.employeeForm.controls['email'].value;
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    this.employeeObj = new EmployeeModel();
    this.createForm();
    // this.dataSource = new MatTableDataSource<EmployeeModel>(this.employeeList);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  onSave(){
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null)
    {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empid'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    this.dataSource = new MatTableDataSource<EmployeeModel>(this.employeeList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 

    console.log(this.employeeObj, 'emp')
    console.log(this.employeeList[0],"list")

    if(this.employeeForm.controls['contactNo'])

    var data = new FormControl(this.employeeObj.contactNo.length == 10)
    // this.inputMessage=`you typed: ${event.target.value}`

    if(this.employeeForm.controls['contactNo']){
      // contactNo: new FormControl(this.employeeObj.contactNo,[Validators.pattern("[0-9 ]{10}")]);
      // console.log(this.employeeObj.contactNo)
    }

    //console.log(this.employeeForm, 'form', this.employeeForm.controls['contactNo'].value)

    if (this.employeeForm.controls['contactNo'].value.length == 10){
      console.log('correct')
    }

    if(this.employeeForm.valid){
      this.service.setFormData(this.employeeForm.value);
    }
  }

  onInputChange(event: any){
    if(this.employeeList[0].contactNo.length == 10){
    this.employeeObj.contactNo=`you typed: ${event.target.value}`
    console.log(this.employeeObj.contactNo,"No");
    }
  }

  onEdit(element:EmployeeModel){
    this.employeeObj = element;
    this.createForm()
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure");
    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.empid == id);
      this.employeeList.splice(index,1);
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList)) 
    }
    window.location.reload();
  }

  filterChange(data:Event){
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  onDeleteAll(){
    localStorage.removeItem("EmpData")
  }

  onClickSubmit(data:any){
 
  }
}
