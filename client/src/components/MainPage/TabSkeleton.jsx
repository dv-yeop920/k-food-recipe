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
        }}
        width={70}
        height={30}
      />
    </div>
  );
};

export default TabSkeleton;
