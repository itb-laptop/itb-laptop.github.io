// class rating
export class Rating {
  public admin_id: string = '';
  public star: number = 0;
  public comment: string = '';

  constructor(data: any) {
    this.loadFromJson(data);
  }

  loadFromJson(data: any) {
    this.admin_id = data.admin_id || this.admin_id;
    this.star = data.star || this.star;
    this.comment = data.comment || this.comment;
  }
}
