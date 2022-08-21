import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/utility/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  public userData: any;
  public url: any;
  public btnText: string = 'Add';
  public userId: any = '';
  public profileUrl: any;
  public displayUrl: string | ArrayBuffer | null | undefined = '';
  public imgUpdatedRes: any = '';
  public isVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10)
          ]
        ],
      }
    );

    this.route.queryParams.subscribe((params) => {
      if (params && params.url) {
        this.userData = JSON.parse(params['data']);
        this.url = params['url'];
        this.setFormData();
      }
    });
  }

  setFormData() {
    this.btnText = "Update"
    this.displayUrl = this.userData.profileUrl ? `http://localhost:3000/${this.userData.profileUrl}` : null;
    this.userId = this.userData._id;
    this.form.controls.firstName.setValue(this.userData.firstName);
    this.form.controls.lastName.setValue(this.userData.lastName);
    this.form.controls.email.setValue(this.userData.emailId);
    this.form.controls.mobile.setValue(this.userData.mobile);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.btnText === 'Add')
      this.saveForm();
    else
      this.updateForm();
  }

  saveForm() {
    this.url = 'user/create';

    const data = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      emailId: this.form.value.email,
      mobile: this.form.value.mobile
    };
    this.apiService.postApi(this.url, data).subscribe((result) => {
      alert(result.message);
      this.uploadProfileImg(result.payload['_id']);
      this.onReset();
    });
  }

  uploadProfileImg(id: any) {
    const url = 'user/upload/profile';

    const data = new FormData();
    data.append('_id', id);
    data.append('file', this.profileUrl);

    this.apiService.uploadImagePostApi(url, data).subscribe((result) => {
      this.imgUpdatedRes = result.message;
      this.showAlert();
    });
  }

  updateForm() {
    this.url = 'user/update';

    const data = {
      _id: this.userId,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      emailId: this.form.value.email,
      mobile: this.form.value.mobile
    };
    this.apiService.patchApi(this.url, data).subscribe((result) => {
      alert(result.message);
      this.navToView();
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  navToView() {
    this.router.navigate(['/view'])
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.profileUrl = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.displayUrl = event.target?.result;
      }

      if (this.userId) {
        this.uploadProfileImg(this.userId)
      }
    }
  }

  showAlert(): void {
    if (this.isVisible) { // if the alert is visible return
      return;
    }
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 2500); // hide the alert after 2.5s
  }
}
