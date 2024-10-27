import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient : HttpClient) { }

  baseUrl:string = "https://ecommerce.routemisr.com/api/v1/"

  // Get All Products
  getProducts():Observable<any>{
    return this._HttpClient.get(this.baseUrl + "products")
  }

  // Get Specific Product
  getSpecificProduct(productId:string|any):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `products/${productId}`)
  }

}
