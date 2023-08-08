import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/app/interfaces/resource';
import { ResourceService } from 'src/app/services/resource.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  resources: Resource[] = []
  values: boolean = false;

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceService.getResources().subscribe(response =>{
      this.values = true
      this.resources = response
    }, error => {
      console.log(error)
    })
  }
}
