export interface IExpandable {
  expanded?: boolean;
}

export type ActionsState = Record<string | number, {
  inflight: boolean;
  error?: any;
}>;
