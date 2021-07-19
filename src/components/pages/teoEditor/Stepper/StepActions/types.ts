export interface IStepAction {
  name: string;
  action: () => void;
  forLastStep?: boolean;
  forStep?: string;
}
