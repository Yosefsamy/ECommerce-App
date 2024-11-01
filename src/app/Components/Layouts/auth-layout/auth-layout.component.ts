import { Component } from '@angular/core';
import { NavbarAuthComponent } from '../../navbar-auth/navbar-auth.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavbarAuthComponent , RouterOutlet , FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
