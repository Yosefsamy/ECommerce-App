import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/auth.guard';
import { blankGuard } from './Core/Guards/blank.guard';

export const routes: Routes = [
    
    // ! Blank Layout ! //
    {
        path : "",
        canActivate : [authGuard],
        loadComponent: ()=>
            import("./Components/Layouts/blank-layout/blank-layout.component")
            .then((m)=>m.BlankLayoutComponent),
        children: [
            {path : "" , redirectTo : "Home" , pathMatch : "full" },
            { path : "Home",
            loadComponent: ()=>
                import("./Components/home/home.component")
                .then((m)=>m.HomeComponent),
                title: "Home"
            },
            { path : "ProductDetails/:productId",
            loadComponent: ()=>
                import("./Components/product-details/product-details.component")
                .then((m)=>m.ProductDetailsComponent),
                title: "Product Details"
            },
            { path : "Contact",
            loadComponent: ()=>
                import("./Components/contact/contact.component")
                .then((m)=>m.ContactComponent),
                title: "Contact"
            },
            { path : "About",
            loadComponent: ()=>
                import("./Components/about/about.component")
                .then((m)=>m.AboutComponent),
                title: "About"
            },
            { path : "Cart",
            loadComponent: ()=>
                import("./Components/cart/cart.component")
                .then((m)=>m.CartComponent),
                title: "Cart"
            },
            { path : "Wishlist",
            loadComponent: ()=>
                import("./Components/wishlist/wishlist.component")
                .then((m)=>m.WishlistComponent),
                title: "Wishlist"
            },
            { path : "Payment/:cartId",
            loadComponent: ()=>
                import("./Components/payment/payment.component")
                .then((m)=>m.PaymentComponent),
                title: "Payment"
            },
            { path : "allorders",
            loadComponent: ()=>
                import("./Components/all-orders/all-orders.component")
                .then((m)=>m.AllOrdersComponent),
                title: "Home"
            },
        ]

    },

    // ! Auth Layout ! //
    {
        path : "",
        canActivate : [blankGuard],
        loadComponent: ()=>
            import("./Components/Layouts/auth-layout/auth-layout.component")
            .then((m)=>m.AuthLayoutComponent),
        children: [
            {path : "" , redirectTo : "SignUp" , pathMatch : "full" },
            { path : "SignUp",
            loadComponent: ()=>
                import("./Components/signup/signup.component")
                .then((m)=>m.SignupComponent),
                title: "Sign Up",
            },
            { path : "Login",
            loadComponent: ()=>
                import("./Components/login/login.component")
                .then((m)=>m.LoginComponent),
                title: "Login"
            }
        ]
    },

    // ! Not Found Page ! //
    {path : "**" ,
    loadComponent: ()=>
    import("./Components/not-found/not-found.component")
    .then((m)=>m.NotFoundComponent),
    title: "Not Found" }

];
