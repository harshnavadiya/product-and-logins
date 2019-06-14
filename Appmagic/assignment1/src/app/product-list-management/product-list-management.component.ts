import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Common } from '../common';
import { ProductList } from '../data_set/product-list';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductViewManagementComponent } from '../product-view-management/product-view-management.component';

@Component({
  selector: 'app-product-list-management',
  templateUrl: './product-list-management.component.html',
  styleUrls: ['./product-list-management.component.css']
})
export class ProductListManagementComponent implements OnInit {
 params:any = new URLSearchParams();
product:Array<ProductList>;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    axios.post(Common.base_url+"/get_product",this.params).then(res=>{
      // console.log(res);
      this.product=res.data.payload;
      console.log(this.product);
    })
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(ProductViewManagementComponent, {
      width: '80%',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


}

