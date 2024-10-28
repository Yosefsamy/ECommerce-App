import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Core/Services/products.service';
import { Product } from '../../Core/Interfaces/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../Core/Services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productId:string|null = ""
  productDetails:any = null
  wishlistData: string[] = [] 
  constructor(
    private _activatedRoute : ActivatedRoute , 
    private _productsService : ProductsService ,
    private _cartService : CartService , 
    private _wishlistService : WishlistService,
    private toastr: ToastrService){}

  ngOnInit(): void {
    // Get Link From URL
    this._activatedRoute.paramMap.subscribe({
      next:(res)=>{
      this.productId = res.get("productId")
      // console.log(this.productId);
      }
    })

    // Call Method
    this.getProductDetails(this.productId)

    this.getWishlistProducts()
  }

  getProductDetails(productId:string|null){
    this._productsService.getSpecificProduct(productId).subscribe({
      next:(res)=>{
        // console.log(res);
        this.productDetails = res.data
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
