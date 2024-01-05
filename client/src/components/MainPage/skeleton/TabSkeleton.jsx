import React from "react";
import { Skeleton } from "@mui/material";

const TabSkeleton = () => {
  return (
    <div>
      <Skeleton
        animation="wave"
        variant="button"
        style={{
          borderRadius: "15px",
          marginRight: "10px",
          width: "6rem",
        }}
        height={60}
      />
    </div>
  );
};

export default TabSkeleton;
