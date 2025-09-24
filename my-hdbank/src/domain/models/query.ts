export class Query<TParameter> {
  query: TParameter;

  constructor(params: { query: TParameter }) {
    this.query = params.query;
  }
}
