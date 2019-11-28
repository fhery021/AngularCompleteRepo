import { ServerService } from './servers.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observer, Subject } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  servers: any = [];
  errors = '';
  appName = this.serverService.getAppName();

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    // this.errors
    this.loadServers();
  }

  onAddServer(serverName: string) {
    this.servers.push({
      name: serverName,
      capacity: 50,
      id: this.generateId()
    });
  }

  loadServers() {
    this.servers = [];
    return this.serverService
      .getServers()
      .subscribe(
        (data: any[]) => { this.servers = data; },
        (error) => { this.errors = error; }
      );
  }

  onGet() {
    this.loadServers();
  }

  onSave() {
    this.serverService
      .storeServers(this.servers)
      .subscribe(
        (response: Response) => console.log(response),
        (error) => this.errors = error
      );

  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
