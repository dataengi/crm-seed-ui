export class Notification {
  constructor(public id: number,
              public type: string,
              public message: string,
              public title?: string) {
  }
}
