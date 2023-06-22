import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Wait for 3 seconds (3000 milliseconds) before redirecting
    setTimeout(() => {
      this.router.navigate(['/order-complete']); // Replace '/another-page' with the desired route path
    }, 3000);
  }
}
