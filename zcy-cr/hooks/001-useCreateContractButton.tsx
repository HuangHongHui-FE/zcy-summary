import React, { useEffect } from "react";
import { isShowContractCreation } from "../services";

const useCreateContractButton = ({ businessType, projectId, createContract }) => {
  const [isDisplayContractButton, setIsDisplayContractButton] = React.useState(false);

  const getIsDisplayContractButton = async () => {
    if (projectId && businessType) {
      const { result } = await isShowContractCreation({
        projectId,
        businessType,
      });
      setIsDisplayContractButton(result);
    }
  };

  useEffect(() => {
    getIsDisplayContractButton();
  }, [projectId, businessType]);
  return [
    isDisplayContractButton && {
      label: "创建合同",
      type: "primary",
      onClick: () => {
        createContract();
      },
    },
  ].filter(Boolean);
};
export default useCreateContractButton;



// 使用：
// useCreateContractButton({businessType: 2, projectId: projectNo, createContract}),