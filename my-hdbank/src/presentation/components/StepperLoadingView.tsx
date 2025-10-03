import { useState, useEffect } from "react";
import { Box } from "zmp-ui";

export const StepperLoadingView = () => {
  const steps = [1, 2, 3, 4, 5, 6];
  const [active, setActive] = useState(1); // Current active step (0-indexed)
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev >= steps.length ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(id);
  }, []);

  return (
    <Box className="flex flex-row space-x-2">
      {steps.map((step, index) => {
        const isCompleted = index < active;

        return (
          <Box
            key={step}
            className={`
                w-6 h-6 rounded-full 
                ${isCompleted ? "bg-[#DA2128]" : "bg-[#E0E2E9]"} 
              `}
          />
        );
      })}
    </Box>
  );
};
