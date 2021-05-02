import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css'],
})
export class UserDetailPageComponent {
  constructor(private route: ActivatedRoute) {}
}
