import { Component, OnInit } from '@angular/core';
import { Product } from '../../Core/Interfaces/product';
import { WishlistService } from '../../Core/Services/wishlist.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule , RouterLink , CutTextPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  products:Product[] = []
  wishlistData: string[] = []

  constructor(private _wishlistService : WishlistService , private _cartService : CartService , private toastr: ToastrService){}
  
  ngOnInit(): void {
    this.getProducts()
  }


  // Get Products In Wishlist
  getProducts(){
    this._wishlistService.getWishlistDetails().subscribe({
      next:(res)=>{
        console.log(res);
        this.products = res.data
        const newData = res.data.map( (item:any)=> item._id)
        this.wishlistData = newData
      },
      error:(err)=>{
        // console.log(err);
      }
    })
  }

  // Add To Wishlist
  addToWishlist(prodId:string){
      this._wishlistService.addToWishlist(prodId).subscribe({
        next:(res)=>{
        console.log(res);
        this.wishlistData = res.data
        this._wishlistService.wishListNumber.next(res.data.length)
        this.toastr.success(res.message)
        },
        error:(err)=>{
          // console.log(err);
        }
      })
  }

  // Delete Product From Wishlist
  deleteFromWishlist(prodId:string){
    this._wishlistService.deleteFromWishlist(prodId).subscribe({
      next:(res)=>{
        // console.log(res);
        this.wishlistData = res.data
        this._wishlistService.wishListNumber.next(res.data.length)
        this.toastr.success(res.message)

        // ! Update The Products In Page ! 
        this.getProducts()
      },
      error:(err)=>{
        // console.log(err);
      }
    })
  }
  
  // Add To Cart
  addToCart(prodId:string){
    this._cartService.addToCart(prodId).subscribe({
      next:(res)=>{
      // console.log(res);
      this.toastr.success(res.message)
      this._cartService.cartNumber.next(res.numOfCartItems)
      },
      error:(err)=>{
        // console.log(err);
      }
    })
  }





}
