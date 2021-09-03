export enum EntityUIState {
  NEW,
  IDLE,
  LOADING,
  REFRESHING,
  LOADING_MORE,
  ERRORED,
  EMPTY
}

export interface EntityUIStateWrapper {
  state: EntityUIState;
  error?: any;
}
