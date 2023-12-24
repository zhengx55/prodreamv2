import { IActListResData } from '@/query/type';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type IActListContext = {
  historyData: IActListResData;
  setHistoryData: Dispatch<SetStateAction<IActListResData>>;
  generatedData: IActListResData;
  setGeneratedData: Dispatch<SetStateAction<IActListResData>>;
  handleDelete: (
    id: string,
    type: string,
    dataType: 'generated' | 'history'
  ) => void;
  handleSave: (
    id: string,
    title: string,
    text: string,
    type: string,
    dataType: 'generated' | 'history'
  ) => void;
  showGenerateTut: boolean;
  setShowGenerateTut: Dispatch<SetStateAction<boolean>>;
  showEditTut: boolean;
  setShowEditTut: Dispatch<SetStateAction<boolean>>;
};

const ActListContext = createContext({} as IActListContext);

export default function ActListProvider({ children }: { children: ReactNode }) {
  const [historyData, setHistoryData] = useState<IActListResData>({});
  const [generatedData, setGeneratedData] = useState<IActListResData>({});
  const [showGenerateTut, setShowGenerateTut] = useState(false);
  const [showEditTut, setShowEditTut] = useState(false);

  const handleDelete = (
    id: string,
    type: string,
    dataType: 'generated' | 'history'
  ) => {
    if (dataType === 'generated') {
      const filteredData: IActListResData = {
        ...generatedData,
        [type]: {
          activities: generatedData[type].activities.filter(
            (activity) => activity.id !== id
          ),
          id: generatedData[type].id,
        },
      };
      setGeneratedData(filteredData);
    } else {
      const filteredData: IActListResData = {
        ...historyData,
        [type]: {
          activities: historyData[type].activities.filter(
            (activity) => activity.id !== id
          ),
          id: historyData[type].id,
        },
      };
      setHistoryData(filteredData);
    }
  };

  const handleSave = (
    id: string,
    title: string,
    text: string,
    type: string,
    dataType: 'generated' | 'history'
  ) => {
    if (dataType === 'generated') {
      setGeneratedData((prev) => ({
        ...prev,
        [type]: {
          activities: generatedData[type].activities.map((activity) => {
            if (activity.id === id) {
              return {
                ...activity,
                title,
                result: text,
              };
            }
            return activity;
          }),
          id: generatedData[type].id,
        },
      }));
    } else {
      setHistoryData((prev) => ({
        ...prev,
        [type]: {
          activities: historyData[type].activities.map((activity) => {
            if (activity.id === id) {
              return {
                ...activity,
                title,
                text: text,
              };
            }
            return activity;
          }),
          id: historyData[type].id,
        },
      }));
    }
  };

  return (
    <ActListContext.Provider
      value={{
        handleDelete,
        historyData,
        generatedData,
        setHistoryData,
        setGeneratedData,
        handleSave,
        showGenerateTut,
        setShowGenerateTut,
        showEditTut,
        setShowEditTut,
      }}
    >
      {children}
    </ActListContext.Provider>
  );
}

export const useActListContext = () => useContext(ActListContext);
