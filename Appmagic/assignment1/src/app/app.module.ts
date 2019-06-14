import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from "@angular/material";
import 'hammerjs';
import { ProductListManagementComponent } from './product-list-management/product-list-management.component';
import { ProductViewManagementComponent } from './product-view-management/product-view-management.component';
import { PaymentManagementComponent } from './payment-management/payment-management.component';
import { FormsModule } from '@angular/forms';

import { DashManagementComponent } from './dash-management/dash-management.component';


import { Auth0ServiceService } from './auth0-service.service';

// Import your library
import { NgxStripeModule } from '@nomadreservations/ngx-stripe';

@NgModule({
  declarations: [AppComponent, ProductListManagementComponent, ProductViewManagementComponent, PaymentManagementComponent,  DashManagementComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    FormsModule,
    FlexLayoutModule,
    NgxStripeModule.forRoot('pk_test_Mqr3u3m4GxVLcYE6wkDPWrjB00H8KcZe7y')
  ],
  entryComponents:[ProductViewManagementComponent,PaymentManagementComponent],
  providers: [
    Auth0ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
