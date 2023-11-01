// class admin
export class Admin {
  public _id: any = '';
  public itb_name: string = '';
  public name: string = '';
  public department: string = '';
  public image: string = '';
  public description: string = '';
  public total_star: number = 0;
  public total_review: number = 0;

  constructor(data: any) {
    this.loadFromJson(data);
  }

  loadFromJson(data: any) {
    this._id = data._id || this._id;
    this.itb_name = data.itb_name || this.itb_name;
    this.name = data.name || this.name;
    this.department = data.department || this.department;
    this.image = data.image || this.image;
    this.description = data.description || this.description;
    this.total_star = data.total_star || this.total_star;
    this.total_review = data.total_review || this.total_review;
  }
}
