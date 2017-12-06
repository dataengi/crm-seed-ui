export class Period {

  constructor(public from: number, public to: number) {
  }

  toStartAndEndOfDay(): Period {
    let from = new Date(this.from).setHours(0, 0, 0, 0);
    let to = new Date(this.to).setHours(23, 59, 59, 999);
    return new Period(from, to)
  }

}
