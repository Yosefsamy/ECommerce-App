import { HttpInterceptorFn } from '@angular/common/http';


export const myhttpInterceptor: HttpInterceptorFn = (req, next) => {
 
  // If the token exists, clone the request and set the authorization header
  if (localStorage.getItem("Token") !== null) {

    const myToken : any = {
      token : localStorage.getItem("Token")
    }


    req = req.clone({
      setHeaders: myToken
    }); 

  }

  // Pass the cloned request to the next handler
  return next(req)
};
