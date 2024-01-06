import { useState, useEffect } from 'react';
import { apiRequest } from '../Api/api';
import ApiDataContext from './apiDataContext';

type ApiDataContextProps = {
  children: React.ReactNode;
};

function ApiDataProvider({ children }: ApiDataContextProps) {
  const [apiData, setApiData] = useState([]);
  const [apiDataBackup, setApiDataBackup] = useState([]);
  useEffect(() => {
    async function resulTableCellataApi() {
      const result = await apiRequest();
      setApiData(result);
      setApiDataBackup(result);
    }
    resulTableCellataApi();
  }, []);

  return (
    <ApiDataContext.Provider
      value={ { apiData, setApiData, apiDataBackup, setApiDataBackup } }
    >
      <div>
        { children }
      </div>
    </ApiDataContext.Provider>
  );
}

export default ApiDataProvider;
