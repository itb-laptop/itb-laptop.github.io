import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Admin } from 'src/models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  selectedAdmin = new Admin({});

  private applicationHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  private textHeaders = new HttpHeaders({
    'Content-Type': 'text/plain; charset=utf-8',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private _http: HttpClient) { }

  // get all admin
  getAllAdmin(): Observable<any> {
    const requestOptions: Object = {
      headers: this.textHeaders,
      responseType: "text"
    }
    return this._http.get<any>('http://localhost:4010/v1/admins', requestOptions).pipe(
      map(res => JSON.parse(res) as Admin[]),
      retry(2),
      catchError(this.handleError)
    );
  }

  // get admin by id
  getAdminById(id: string): Observable<any> {
    const requestOptions: Object = {
      headers: this.textHeaders,
      responseType: "text"
    }
    return this._http.get<any>('http://localhost:4010/v1/admins/' + id, requestOptions).pipe(
      map(res => JSON.parse(res) as Admin),
      retry(2),
      catchError(this.handleError)
    );
  }

  // error handling
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}
