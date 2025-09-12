import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComponent } from './my-component/my-component';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MyComponent, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('testAngular2');
}
