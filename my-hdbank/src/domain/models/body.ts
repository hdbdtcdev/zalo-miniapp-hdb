export class Body<TBody> {
  data: TBody;
  constructor(body: { data: TBody }) {
    this.data = body.data;
  }
}
export class HdBody<TBody> extends Body<TBody> {
  screenName: string;
  requestId?: string;

  constructor(body: { data: TBody }, screenName: string, requestId?: string) {
    super(body);
    this.screenName = screenName;
    this.requestId = requestId;
  }
}
