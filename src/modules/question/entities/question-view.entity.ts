/*@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
})
export class QuestionView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  uuid: string;

  @ViewColumn()
  readonly type: QuestionType.OneOf;

  @ViewColumn()
  text: string;

  @ViewColumn()
  options: Array<Option>;

  @ViewColumn()
  answer: Array<Option>;

  @ViewColumn()
  order: number;
}*/
