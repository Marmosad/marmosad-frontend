import { Injectable } from '@angular/core';

@Injectable()
export class NameService {
  private name: string;

  constructor() {}

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }
}
