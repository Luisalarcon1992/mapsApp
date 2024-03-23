import { Component } from '@angular/core';

interface MenuItem {
  name: string,
  route: string,
}


@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {


  public menuItems: MenuItem[] = [
    { name: 'Fullscreen', route: 'fullscreen' },
    { name: 'Zoom Range', route: 'zoom-range' },
    { name: 'Markers', route:    'markers' },
    { name: 'Property', route:   'property' },
  ];
}

