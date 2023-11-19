import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { icon, latLng, marker, tileLayer } from 'leaflet';
declare const L:any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit,OnChanges{
  @Input()
  latitude:number=0
  
  @Input()
  longitude:number=0
  
  
  options:any|undefined=undefined
  
  layer=[marker([this.latitude, this.longitude])]
  
  ngOnInit(): void {
    if(this.latitude!=0 && this.longitude!=0){
      console.log("Hello")
      this.options={
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
        ],
        zoom: 18,
        center: latLng(this.latitude, this.longitude)
      };
      console.log(this.options)
    }
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.latitude!=0 && this.longitude!=0){
      console.log("Hello")
      this.options={
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
        ],
        zoom: 18,
        center: latLng(this.latitude, this.longitude)
      };
      console.log(this.options)
    }
    this.layer=[marker([this.latitude, this.longitude],{
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    })]
  }
}
