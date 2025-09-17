import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() ipData: IpInfo | null = null;
  @Output() searchIpEvent = new EventEmitter<string>();

  onSearch(ipAddress: string): void {
    // Make sure the input value is valid before emitting
    if (ipAddress) {
      this.searchIpEvent.emit(ipAddress);
    }
  }
}
