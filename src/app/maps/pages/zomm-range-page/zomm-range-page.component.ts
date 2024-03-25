import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  templateUrl: './zomm-range-page.component.html',
  styleUrls: ['./zomm-range-page.component.css']
})
export class ZommRangePageComponent implements AfterViewInit, OnDestroy{

  @ViewChild('map')
  public divMap?: ElementRef;

  public currentZoom: number = 17;
  public map?: Map;
  public currenteLngLat: LngLat = new LngLat(-58.44983755, -34.54552366);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw new Error('No divMap element found');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currenteLngLat, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });

    this.mapListener();
  }

  mapListener() {
    if ( !this.map ) throw new Error('No map element found');

    this.map.on('zoom', (ev) => {
      this.currentZoom = this.map?.getZoom() || 0;
    });

    this.map.on('zoomend', (ev) => {
      if ( this.map!.getZoom() < 18 ) return;
      this.map?.zoomTo(18);
    });

    this.map.on('moveend', (ev) => {
      const { lng, lat } = this.map!.getCenter();
      this.currenteLngLat = new LngLat(lng, lat);
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(zoom: string){
    this.currentZoom = Number(zoom);
    this.map?.zoomTo(this.currentZoom);
  }

  ngOnDestroy(): void {
    this.map!.remove();
  }
}



