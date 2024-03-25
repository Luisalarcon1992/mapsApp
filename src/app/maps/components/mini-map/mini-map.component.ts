import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { Map, Marker } from 'mapbox-gl';
@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {


  @Input()
  public lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {

    if( !this.lngLat) throw new Error('lngLat is required');
    if( !this.divMap) throw new Error('divMap is required');

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false,
    })

    new Marker().setLngLat(this.lngLat).addTo(map);
  }


}
