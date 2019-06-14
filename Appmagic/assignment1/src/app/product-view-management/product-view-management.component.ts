import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { PaymentManagementComponent } from '../payment-management/payment-management.component';

@Component({
  selector: 'app-product-view-management',
  templateUrl: './product-view-management.component.html',
  styleUrls: ['./product-view-management.component.css']
})
export class ProductViewManagementComponent implements OnInit {
 employees = [];

  // constructor() { }
constructor(
    public dialogRef: MatDialogRef<ProductViewManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  openBottomSheet(): void {
    
      const dialogRef = this.dialog.open(PaymentManagementComponent, {
        width: '40%',
        data: this.data
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
    }
  

  // addcart(data){
    
  //   if(localStorage.getItem("cart")){
  //     this.employees=[];
  //     this.employees.push(JSON.parse(localStorage.getItem("cart")));
  //     // this.employees[this.employees.length]=data;
  //     console.log(JSON.parse(localStorage.getItem("cart")))
  //     console.log(data);
  //     // this.employees.push(data);
  //     // console.log(this.employees);
  //   localStorage.setItem("cart", JSON.stringify(this.employees));

  // }else{
  //   // this.employees
  //   localStorage.setItem("cart",  JSON.stringify(data));

  // }
  // // console.log(JSON.parse(localStorage.getItem("cart")));
  // }

 

  ngOnInit() {

  }

  

}
