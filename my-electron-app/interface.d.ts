export interface IElectronAPI {
  loadPreferences: () => Promise<void>;
  setTitle: (title: string) => void;
  openFile: () => Promise<string>;
  onUpdateCounter: (callback: (value: number) => void) => void;
  counterValue: (value: number) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
    myAPI: {
      desktop: boolean;
    };
    versions: {
      node: () => string;
      chrome: () => string;
      electron: () => string;
      ping: () => Promise<string>;
    };
  }
}
