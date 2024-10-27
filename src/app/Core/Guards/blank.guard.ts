import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const blankGuard : CanActivateFn = (route, state) => {
  
  const _router = inject(Router)

  if(localStorage.getItem("Token") !== null){
    _router.navigate(['/Home'])
    return false
  }

  else{
    return true
  }
  
};
