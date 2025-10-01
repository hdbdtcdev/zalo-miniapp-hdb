export class Command<TParameter> {
  command: TParameter;

  constructor(params: { command: TParameter }) {
    this.command = params.command;
  }
}