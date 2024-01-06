import { createContext } from 'react';

type ApiDataType = {
  apiData: any[];
  setApiData: (data: any) => void;
  apiDataBackup: any[];
  setApiDataBackup: (data: any) => void;
};
const ApiDataContext = createContext({} as ApiDataType);

export default ApiDataContext;
