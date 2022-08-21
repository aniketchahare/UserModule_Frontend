import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/utility/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  public list: any[] = [];
  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    let url = 'user/get';

    const data = {
    };

    this.apiService
      .postApi(
        url,
        data
      )
      .subscribe((result) => {
        this.list = result.payload
      });
  }

  navToForm() {
    this.router.navigate(['/form'])
  }

  update(data: any) {
    const url = 'user/update';
    this.router.navigate(['/form'], { queryParams: { url: url, data: JSON.stringify(data) } })
  }

  delete(id: any) {
    let url = 'user/delete';

    const data = {
      _id: id
    };

    this.apiService
      .postApi(
        url,
        data
      )
      .subscribe((result) => {
        alert(result.message);
        this.getList();
      });
  }
}
