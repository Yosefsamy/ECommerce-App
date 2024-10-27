import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../Core/Services/cart.service';
import { WishlistService } from '../../Core/Services/wishlist.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterLinkActive],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.css'
})
export class NavbarBlankComponent implements OnInit {

  cartNum:number = 0
  wishListNum:number = 0

  constructor(private _router: Router , private _cartService : CartService , private _wishlistService : WishlistService){}

  ngOnInit(): void {
    this._cartService.cartNumber.subscribe({
      next:(data)=>{
        // console.log(data);
        this.cartNum = data
      }
    })

    this._wishlistService.wishListNumber.subscribe({
      next:(data)=>{
        // console.log(data);
        this.wishListNum = data
      }
    })

    // To Get Number of Items In The Cart In The Beginning
    this._cartService.getCartDetails().subscribe({
      next:(res)=>{
        this.cartNum = res.numOfCartItems
      }
    })
    
    // To Get Number of Items In The Wishlist In The Beginning
    this._wishlistService.getWishlistDetails().subscribe({
      next:(res)=>{
        this.wishListNum = res.data.length
      }
    })

    
  }
  
  signOut():void{
    localStorage.removeItem("Token")
    this._router.navigate(['/Login'])
  }
}
