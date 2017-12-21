import {Component, OnDestroy, OnInit} from "@angular/core";
import {MainLayoutService} from "./main-layout.service";

@Component({
  selector: 'app-dashboard', //according to template
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  showBreadcrumb = true;

  constructor(private mainLayoutService: MainLayoutService) {
  }

  version: string = "0.0.0";

  ngOnInit() {

    this.mainLayoutService.getVersion().subscribe(
      (data:any) => this.version = data.version,
      error => console.error("Can't load version", error)
    );

  }

  ngOnDestroy() {
  }

}
