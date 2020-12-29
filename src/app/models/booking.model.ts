export class BookingDetails {

  constructor(
    public guests: number | undefined,
    public location: { name: string, _id: string },
    public date: string,
    public session: string,
    public timeslot: string,
    public total?: number
  ) { }
}
