import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/models/admin.model';
import { AdminService } from 'src/services/admin.service';
import { RatingService } from 'src/services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  selectedRadioButtonValue: string = '4';
  comment: string = '';

  constructor(public _adminService: AdminService, public _ratingService: RatingService, private _activeRoute: ActivatedRoute, private _router: Router) {
    // get admin id from url
    // this.getAdmin();
  }

  ngOnInit() {
    // get admin id from url
    this.getAdmin();
    this._ratingService.checkRating();
  }

  // get admin
  getAdmin() {
    let admin_id = this._activeRoute.snapshot.paramMap.get('id');
    if (!admin_id) return;
    this._adminService.getAdminById(admin_id).subscribe({
      next: (data) => {
        let admin = new Admin(data);
        console.log(admin);
        this._adminService.selectedAdmin = admin;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // POST rating
  postRating() {
    if (this._ratingService.checkRating()){
      this._router.navigate(['/']);
      return;
    }
    let admin_id = this._adminService.selectedAdmin._id;
    // convert string to number
    let star = Number(this.selectedRadioButtonValue);
    if (!admin_id) return;
    this._ratingService.postRating(admin_id, star, this.comment).subscribe({
      next: (data) => {
        let result = JSON.parse(data);
        // {"message":"Rating successfully","result":{"acknowledged":true,"insertedId":"64b153bbb57f0a1b0047aacd"}}
        if (result.result.insertedId) {
          // save insertedId to local storage
          localStorage.setItem('ratingInsertedId', result.result.insertedId);
          this._ratingService.adminMessage = 'Cảm ơn bạn đã đánh giá cho 🍊 nhé!'
          this._ratingService.buttonMessage = 'Về trang chủ thoy';
          // reset form
          this.selectedRadioButtonValue = '3';
          this.comment = '';
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
