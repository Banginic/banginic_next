import React, { createContext, useState } from "react";
import type { WorkContextType } from "../models/projectTypes";

export const WorkContext = createContext<WorkContextType | undefined>(
  undefined
);

function WorkProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null {
  const [showDetails, setShowDetails] = useState(true);
  const [renderDetails, setRenderDetails] = useState<boolean>(false);

  function handleRenderDetails(): void {
    setRenderDetails(false);
  }

  const values = {
    showDetails,
    setShowDetails,
    renderDetails,
    handleRenderDetails,
    setRenderDetails,
  };

  return <WorkContext.Provider value={values}>{children}</WorkContext.Provider>;
}

export default WorkProvider;
