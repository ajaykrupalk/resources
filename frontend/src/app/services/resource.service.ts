import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resource } from './../interfaces/resource';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  getResources(): Observable<Resource[]> {
    const getResourcesURL = 'https://resourc-es-backend.onrender.com/getResources'
    const headers = new HttpHeaders()
      .set('Accept-Encoding', 'gzip, compress, br')
      .set('Cache-Control', 'max-age=31536000')

    return this.http.get<Resource[]>(
      getResourcesURL,
      { headers: headers}
    )
  }
}