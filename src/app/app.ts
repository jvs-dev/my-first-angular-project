import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComponent } from './my-component/my-component';
import { Header } from './header/header';

/* let geoCodeRes = {};

function handleSearch() {
  let ip = '8.8.8.8';
  let api_key = 'your_api_key';
  console.log('oi');
  geoCodeRes = {
    ip: '192.212.174.101',
    location: {
      country: 'US',
      region: 'California',
      city: 'Rosemead',
      lat: 34.08057,
      lng: -118.07285,
      postalCode: '91770',
      timezone: '-07:00',
      geonameId: 5388867,
    },
    as: {
      asn: 7127,
      name: 'SCE',
      route: '192.212.0.0/15',
      domain: '',
      type: '',
    },
    isp: '',
    proxy: {
      proxy: false,
      vpn: false,
      tor: false,
    },
  };
}

handleSearch();
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MyComponent, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('testAngular2');
}
