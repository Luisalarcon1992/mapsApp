import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


interface MakerAndColor {
  color: string;
  marker: Marker;
}

interface PlaninMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map')
  public divMap?: ElementRef;

  public currentZoom: number = 17;
  public map?: Map;
  public currenteLngLat: LngLat = new LngLat(-58.44983755, -34.54552366);
  public markers: MakerAndColor[] = [];

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw new Error('No divMap element found');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currenteLngLat, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });

    this.loadFromLocalStorage();

    // Así se podría crear un marcador con un texto personalizado
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'luis alarcon';

    // Agregar el marcador al mapa de manera tradicional o estática
    // const marker = new Marker({
    //   element: markerHtml
    // })
    //   .setLngLat(this.currenteLngLat)
    //   .addTo(this.map);
  }

  creteMarker() {
    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);

  }

  addMarker( lnglat: LngLat, color: string) {
    if ( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lnglat)
      .addTo(this.map);

    this.markers.push({
      color,
      marker
    });

    // Se ejecuta cuando se suelta el marcador
    marker.on('dragend', () => {
      this.saveToLocalStorage();
     })

    this.saveToLocalStorage();
  }

  removeMarker( index: number ) {
    if ( !this.map ) return;

    const marker = this.markers.splice(index, 1)[0];
    marker.marker.remove();
  }

  flyTo( marker: Marker ) {
    if ( !this.map ) return;

    // const marker = this.markers[index];
    // this.map.flyTo({
    //   center: marker.marker.getLngLat(),
    //   zoom: this.currentZoom
    // });

    this.map.flyTo({
      center: marker.getLngLat(),
      zoom: this.currentZoom
    });
  }

  saveToLocalStorage() {
    const planinMarkers: PlaninMarker[] = this.markers.map( ({color, marker}) => {
      return { color, lngLat: marker.getLngLat().toArray() };
    });

    localStorage.setItem('markers', JSON.stringify(planinMarkers));
  };

  loadFromLocalStorage() {


    const markers = localStorage.getItem('markers') || '[]';
    const plainMarkers: PlaninMarker[] = JSON.parse(markers);

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker( coords, color );
    })


  }
}
