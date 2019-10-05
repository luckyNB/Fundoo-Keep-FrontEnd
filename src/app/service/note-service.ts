import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { } from "src/app/service/note-service";
const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
};

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    baseurl = environment.baseUrl;
    baseurl1=environment.baseUrl2;
    constructor(private http: HttpClient) { }
    public postRequest(url: any, data: any): any {
        return this.http.post(this.baseurl + url, data, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
    }
    public getRequest(url: any): any {
        return this.http.get(this.baseurl + url, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
    }
    public putRequest(url:any,data:any):any{
        return this.http.put(this.baseurl+url,data,{headers:new HttpHeaders().set('token',localStorage.getItem('token'))});
 }
 public deleteRequest(url:any):any{
    return this.http.delete(this.baseurl+url,{headers:new HttpHeaders().set('token',localStorage.getItem('token'))});
}
public uploadImage(url: any, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseurl + url, formData, {
    headers: new HttpHeaders().set('token', localStorage.getItem('token'))
    });
    }

    public uploadNoteImage(url: any,data:any, file: File) {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post(this.baseurl1 + url,formData, {
        headers: new HttpHeaders().set('token', localStorage.getItem('token'))
        });
        }





}