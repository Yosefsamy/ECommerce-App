import { Component } from '@angular/core';
import { NavbarBlankComponent } from '../../navbar-blank/navbar-blank.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [NavbarBlankComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

  goToUp():void{
    window.scrollTo(0,0)
  }
  
}
