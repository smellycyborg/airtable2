import { FieldSet } from "airtable";
import { QueryParams } from "airtable/lib/query_params";
import { Task } from "flovv";
import base from "./base";

export interface QueryPayload extends QueryParams<FieldSet> {
  table: string;
  recordIds?: string[];
  errorHandled?: boolean;
}

export default function query(
  { errorHandled, table, recordIds, ...params }: QueryPayload,
  task: Task
) {
  function handleError(error: Error) {
    if (errorHandled) {
      return task.fail(error);
    }
    return alert(`Something went wrong: ${error.message}`);
  }

  if (recordIds) {
    return Promise.all(recordIds.map((id) => base(table).find(id)))
      .then(task.success)
      .catch(handleError);
  }

  return base(table)
    .select(params)
    .firstPage((error, records) => {
      if (error) return handleError(error);
      task.success(records);
    });
}
