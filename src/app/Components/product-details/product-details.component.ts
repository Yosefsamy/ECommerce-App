import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Core/Services/products.service';
import { Product } from '../../Core/Interfaces/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    private _activatedRoute : ActivatedRoute , 
    private _productsService : ProductsService ,
    private _cartService : CartService , 
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

}
