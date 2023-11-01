import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  adminMessage: string = 'Cho 🍊 nhìu nhìu 🧡 vớiii';
  buttonMessage: string = 'Gửi đánh giá';

  private applicationHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  private textHeaders = new HttpHeaders({
    'Content-Type': 'text/plain; charset=utf-8',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private _http: HttpClient) { }

  // POST rating
  postRating(admin_id: string, star: number, comment: string) {
    const requestOptions: Object = {
      headers: this.applicationHeaders,
      responseType: "text"
    }
    return this._http.post<any>('http://localhost:4010/v1/ratings', { admin_id, star, comment }, requestOptions);
  }

  // check if user has rated
  checkRating() {
    if (localStorage.getItem('ratingInsertedId')) {
      this.adminMessage = 'Bạn đã từng đánh giá cho 🍊 rồi!';
      this.buttonMessage = 'Về trang chủ thoy';
      return true;
    }
    return false;
  }
}
