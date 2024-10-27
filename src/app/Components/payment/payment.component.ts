import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../Core/Services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  cartId:string|null = ""

  // & Variable Check The Loading Is True Or Not & //
  isLoading:boolean=false;

  constructor(private _activatedRoute : ActivatedRoute , private _cartService : CartService){}

  orderForm:FormGroup = new FormGroup({
    details : new FormControl(''),
    phone : new FormControl(''),
    city : new FormControl('')
  })


  ngOnInit(): void {
        // Get Link From URL
        this._activatedRoute.paramMap.subscribe({
          next:(res)=>{
          this.cartId = res.get("cartId")
          console.log(this.cartId);
          }
        })
  }

  handleForm():void{
    this.isLoading=true;
    
    this._cartService.checkoutSession(this.cartId , this.orderForm.value).subscribe({
      next : (res : any)=>{
      
        if(res.status == "success"){
          window.open(res.session.url)
          this.isLoading=false;
        }
        
      },
      error : (err)=>{
        // console.log(err);   
        this.isLoading=false;    
      }
    })

}

}