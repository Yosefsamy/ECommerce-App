import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient : HttpClient) { }

  baseUrl:string = "https://ecommerce.routemisr.com/api/v1/"
  wishListNumber :BehaviorSubject<number> = new BehaviorSubject(0)

  // Add To Wishlist
  addToWishlist(prodId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + "wishlist" ,
      {
        productId : prodId
      }
    )
  }


  // Get Wishlist Details
  getWishlistDetails():Observable<any>{
    return this._HttpClient.get(this.baseUrl + "wishlist")
  }

  // Delete Product From Wishlist
  deleteFromWishlist(productId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `wishlist/${productId}`)
  }

}
