import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient : HttpClient) { }

  cartNumber :BehaviorSubject<number> = new BehaviorSubject(0)

  baseUrl:string = "https://ecommerce.routemisr.com/api/v1/"


  
  // Add To Cart
  addToCart(prodId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + "cart" ,
      {
        productId : prodId
      }
     )
  }

  // Get Cart Details
  getCartDetails():Observable<any>{
    return this._HttpClient.get(this.baseUrl + "cart" )
  }

  // Delete Product From Cart
  deleteFromCart(productId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart/${productId}`)
  }

  // Update Cart Count
  updateCartCount(productId:string , cartCount:number):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `cart/${productId}` ,
      {
        count : cartCount
      }
    )
  }

  // Clear Cart
  clearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl + "cart")
  }

  // Checkout Session
  checkoutSession(cartId:string|null , orderInfo:object){
    return this._HttpClient.post(this.baseUrl + 
      `orders/checkout-session/${cartId}?url=https://yosefsamy.github.io/WeatherApp/` ,
      {
        shippingAddress : orderInfo
      }
    )
  }


}
