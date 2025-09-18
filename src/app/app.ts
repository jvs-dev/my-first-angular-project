import { Component, OnInit, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComponent } from './my-component/my-component';
import { Header } from './header/header';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

interface IpInfo {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
  proxy: {
    proxy: boolean;
    vpn: boolean;
    tor: boolean;
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyComponent, Header, HttpClientModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('testAngular2');
  private readonly apiKey = 'at_oOFVrMdhZLbxSucAR7EVyZds50TFI';
  protected ipData = signal<IpInfo | null>(null);
  protected error = signal<string | null>(null);

  private map: L.Map | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchIpInfo();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  fetchIpInfo(ipAddress: string | null = null): void {
    const apiUrl = 'https://geo.ipify.org/api/v1';

    // Se um IP for fornecido, use-o; caso contrário, a API usará o IP do cliente
    let params = new HttpParams().set('apiKey', this.apiKey);
    if (ipAddress) {
      params = params.set('ipAddress', ipAddress);
    }

    this.http.get<IpInfo>(apiUrl, { params }).subscribe({
      next: (data) => {
        this.ipData.set(data);
        console.log('Dados recebidos:', this.ipData());
        this.updateMap();
      },
      error: (err) => {
        this.error.set('Erro ao buscar os dados do IP.');
        console.error('Erro na requisição:', err);
        this.ipData.set(null);
        this.clearMap(); // ⬅️ Limpa o mapa em caso de erro
        alert('Erro ao buscar os dados do IP. Por favor, tente novamente.');
      },
    });
  }

  private clearMap(): void {
    if (this.map) {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map?.removeLayer(layer);
        }
      });
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [34.08057, -118.07285],
      zoom: 13,
      zoomControl: false,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    tiles.addTo(this.map);
  }

  // ⬅️ Método para atualizar a localização no mapa
  private updateMap(): void {
    const data = this.ipData();
    if (this.map && data) {
      this.clearMap(); // ⬅️ Chama o método para limpar o mapa

      const lat = data.location.lat;
      const lng = data.location.lng;
      const newLatLng = L.latLng(lat, lng);

      this.map.setView(newLatLng, 13);
      L.marker(newLatLng)
        .addTo(this.map)
        .bindPopup(`<b>${data.ip}</b><br>${data.location.city}, ${data.location.region}`)
        .openPopup();
    }
  }
}
