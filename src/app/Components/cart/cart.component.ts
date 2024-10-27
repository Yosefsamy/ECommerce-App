import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Core/Services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private _cartService : CartService){}

  cartDetails:any = null

  ngOnInit(): void {
    // Call Method
    this.getUserCart()
  }

  
  getUserCart(){
    this._cartService.getCartDetails().subscribe({
      next:(res)=>{
        // console.log(res);
        this.cartDetails = res.data
      },
      error:(err)=>{
        // console.log(err);
      }
    })
  }


  deleteFromCart(productId:string){
    this._cartService.deleteFromCart(productId).subscribe({
      next:(res)=>{
        // console.log(res);
        this.cartDetails = res.data
        this._cartService.cartNumber.next(res.numOfCartItems)
      },
      error:(err)=>{
        // console.log(err);
      }
    })
  }


  updateCartCount(productId:string , cartCount:number){
    if(cartCount >= 1){
      this._cartService.updateCartCount(productId , cartCount).subscribe({
        next:(res)=>{
          // console.log(res);
          this.cartDetails = res.data
        },
        error:(err)=>{
          // console.log(err);
        }
      })
    }

  }


  clearCart(){
    this._cartService.clearCart().subscribe({
      next:(res)=>{
        // console.log(res);
        if(res.message === "success")
        this.cartDetails = null
        this._cartService.cartNumber.next(0)
      },
      error:(err)=>{
        // console.log(err);
      }
    })
  }

}
