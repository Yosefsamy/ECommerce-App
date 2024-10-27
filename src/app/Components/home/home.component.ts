import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { Product } from '../../Core/Interfaces/product';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';
import { Category } from '../../Core/Interfaces/category';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../Core/Services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule , CutTextPipe , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products:Product[] = []
  wishlistData: string[] = [] 

  constructor(
    private _productsService : ProductsService , 
    private _cartService : CartService , 
    private toastr: ToastrService ,
    private _wishlistService : WishlistService){}

  ngOnInit(): void {
    this.getAllProducts()

    this.getWishlistProducts()
  }

  // Get All Products
  getAllProducts(){
    this._productsService.getProducts().subscribe({
      next:(res)=>{
        // console.log(res);
        this.products = res.data
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

  // Get Products In Wishlist
  getWishlistProducts(){
    this._wishlistService.getWishlistDetails().subscribe({
      next:(res)=>{
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
      },
      error:(err)=>{
        // console.log(err);
      }
    })
  }

}
