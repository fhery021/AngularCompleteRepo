export interface Server {
  capacity: number;
  id: number;
  name: string;
}

export class ServerDTO {
  servers: Array<Server>;
}
