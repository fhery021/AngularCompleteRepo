import { ServerService } from './servers.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  constructor(private serverService: ServerService) { }


  onAddServer(serverName: string) {
    this.servers.push({
      name: serverName,
      capacity: 50,
      id: this.generateId()
    });
  }

  onSave() {
    this.serverService
      .storeServers(this.servers)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );

  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
