import { ServerService } from './servers.service';
import { Component, OnInit } from '@angular/core';
import { ServerDTO, Server } from './ServerDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  servers: Server[] = [];
  serverDTO: ServerDTO;

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
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
      .subscribe((data) => {
        this.serverDTO = data;
        const values = Object.values(this.serverDTO);
        (values[0] as Array<Server>).forEach(server => this.servers.push(server));
      },
      (error) => console.log(error));
  }

  onGet() {
    this.serverService.getServers()
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
  }

  onSave() {
    this.serverService
      .storeServers(this.servers)
      .subscribe(
        (response: Response) => console.log(response),
        (error) => console.log(error)
      );

  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
