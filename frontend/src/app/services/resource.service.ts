import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resource } from './../interfaces/resource';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(
      environment.backendURI
    )
  }
}
