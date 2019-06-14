import { Component, OnInit,Inject } from '@angular/core';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
declare let paypal: any;
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "@nomadreservations/ngx-stripe";
@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.css']
})
export class PaymentManagementComponent implements OnInit {

  addScript: boolean = false;
  paypalLoad: boolean = true;
  price:string;
 

  //stripe
  stripeKey = '';
  error: any;
  complete = false;
  element: any;
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#276fd3',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  constructor(private _stripe: StripeService,public dialogRef: MatDialogRef<PaymentManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // let price=data.price.toString();
    
      let paypalConfig = {
      env: 'sandbox',
      client: {
        sandbox: 'AYEkeLttxlImC69ghX0slnucH6LRDKaVfRut_NqudZ8TbA1TmKPEssTjVZ7xgNDeVVszUy8SqlnkKDmg',
        production: '<your-production-key here>'
      },
      commit: true,
      createOrder: function(dataes, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: data.price,currency:'INR'
                }
            }]
        });
    },
  



    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
    }
    };
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Buttons(paypalConfig).render('#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }


  // ..stripe
  cardUpdated(result) {
    this.element = result.element;
    this.complete = result.card.complete;
    this.error = undefined;
  }

  keyUpdated() {
    this._stripe.changeKey(this.stripeKey);
  }

  getCardToken() {
    this._stripe.createToken(this.element, {
      name: 'tested_ca',
      address_line1: '123 A Place',
      address_line2: 'Suite 100',
      address_city: 'Irving',
      address_state: 'BC',
      address_zip: 'VOE 1H0',
      address_country: 'CA'
    }).subscribe(result => {
      // Pass token to service for purchase.
      console.log(result);
    });
  }

    onNoClick(): void {
      this.dialogRef.close();
    }
  ngOnInit() {
    
    console.log(this.data);

    
  }

addPaypalScript() {
      this.addScript = true;
      return new Promise((resolve, reject) => {
        let scripttagElement = document.createElement('script');    
        scripttagElement.src = 'https://www.paypal.com/sdk/js?client-id=AYEkeLttxlImC69ghX0slnucH6LRDKaVfRut_NqudZ8TbA1TmKPEssTjVZ7xgNDeVVszUy8SqlnkKDmg&currency=INR';
        scripttagElement.onload = resolve;
        document.body.appendChild(scripttagElement);
      })
    }


}
