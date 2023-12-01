"use client";

// IMPORTS
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TransportCo2Props {
  checkbox1: boolean | undefined;
  checkbox2: boolean | undefined;
  checkbox3: boolean | undefined;
  busKm: number;
  carKm: number;
  efficiencyKm: number;
}

interface ElectricityCo2Props {
  biomass: boolean | undefined;
  biomassInput?: string;
  coal: boolean | undefined;
  coalInput?: string;
  fuelOil: boolean | undefined;
  fuelOilInput?: string;
  general: boolean | undefined;
  generalInput?: string;
  heatingCooling: boolean | undefined;
  heatingCoolingInput?: string;
  naturalGas: boolean | undefined;
  naturalGasInput?: string;
  nuclear: boolean | undefined;
  nuclearInput?: string;
  renewable: boolean | undefined;
  renewableInput?: string;
}

interface EatingHabitsProps {
  checkbox1: boolean;
  checkbox2: boolean;
  meat: number;
  vegetables: number;
}

export interface DataFormsProps {
  transportCo2?: TransportCo2Props;
  electricityCo2?: ElectricityCo2Props;
  eatingHabitsCo2?: EatingHabitsProps;
}

interface StepContextProps {
  breadcrumbs: number;
  errorFormAnimation: boolean;
  dataForm: DataFormsProps;

  setDataForm: (value: DataFormsProps) => void;
  setBreadcrumbs: (value: number) => void;
  setErrorFormAnimation: (value: boolean) => void;
}

const StepContext = createContext<StepContextProps>({
  breadcrumbs: 1,
  errorFormAnimation: false,
  dataForm: {},

  setDataForm: () => {},
  setBreadcrumbs: () => {},
  setErrorFormAnimation: () => {},
});

interface Props {
  children: ReactNode;
}

function StepContextProvider({ children }: Props) {
  const [dataForm, setDataForm] = useState<DataFormsProps>({});

  const [breadcrumbs, setBreadcrumbs] = useState<number>(1);
  const [errorFormAnimation, setErrorFormAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (errorFormAnimation) {
      setTimeout(() => {
        setErrorFormAnimation(false);
      }, 1000);
    }
  }, [errorFormAnimation]);

  return (
    <StepContext.Provider
      value={{
        breadcrumbs,
        errorFormAnimation,
        dataForm,

        setDataForm,
        setErrorFormAnimation,
        setBreadcrumbs,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

const useStepContext = () => useContext(StepContext);

export { StepContextProvider, useStepContext };
