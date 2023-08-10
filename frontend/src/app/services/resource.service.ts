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
    const getResourcesURL = 'https://backend-resourc-es.onrender.com/getResources'

    return this.http.get<Resource[]>(
      getResourcesURL
    )
  }
}
