import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/models/admin.model';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent {
  admins: Array<Admin> = [];

  constructor(private _adminService: AdminService, private _router: Router) {
    this.getAllAdmin();
  }

  // get all admin
  getAllAdmin() {
    this._adminService.getAllAdmin().subscribe({
      next: (data) => {
        this.admins = [];
        data.forEach((admin: any) => {
          this.admins.push(new Admin(admin));
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // get admin
  getAdmin(admin_id: string) {
    this._adminService.getAdminById(admin_id).subscribe({
      next: (data) => {
        let admin = new Admin(data);
        this._adminService.selectedAdmin = admin;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // review admin
  reviewAdmin(admin_id: string) {
    this._router.navigate(['/rating/', admin_id]);
    this.getAdmin(admin_id);
    // scroll to top slowly
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }
}
