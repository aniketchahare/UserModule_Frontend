import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    url = environment.apiBaseUrl;
    private httpOptions: any;
    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }

    getApi(myUrl: string): Observable<any> {
        return this.http.get<any>(this.url + myUrl, this.httpOptions).pipe(
            map(data => {
                return data;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error.error);
            })
        );
    }

    postApi(myUrl: string, postData: any): Observable<any> {
        return this.http
            .post<any>(this.url + myUrl, postData, this.httpOptions)
            .pipe(
                map(data => {
                    return data;
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.error && error.error.message) {
                        alert(error.error.message);
                    }
                    // return an observable with a user-facing error message
                    return throwError(error.error);
                })
            );
    }

    /****** Upload Image POST api call******/
    uploadImagePostApi(
        myUrl: String,
        postData: any
    ): Observable<any> {
        this.httpOptions = {
        }
        return this.http
            .post<any>(this.url + myUrl, postData, this.httpOptions)
            .pipe(
                map(data => {
                    return data;
                }),
                catchError((error: HttpErrorResponse) => {
                    // return an observable with a user-facing error message
                    return throwError(error.error.message);
                })
            );
    }

    patchApi(myUrl: String, postData: any): Observable<any> {
        return this.http
            .patch<any>(this.url + myUrl, postData, this.httpOptions)
            .pipe(
                map(data => {
                    return data;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error.error);
                })
            );
    }

    deleteApi(myUrl: string): Observable<any> {
        return this.http
            .delete<any>(this.url + myUrl, this.httpOptions)
            .pipe(
                map(data => {
                    return data;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error.error);
                })
            );
    }
}
