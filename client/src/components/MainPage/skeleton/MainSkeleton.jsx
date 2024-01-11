import { Skeleton } from "@mui/material";
import React from "react";

const MainSkeleton = () => {
  return (
    <div>
      <Skeleton
        style={{
          marginBottom: "10px",
          borderRadius: "20px",
        }}
        animation="wave"
        variant="image"
        width={230}
        height={250}
      />
      <Skeleton
        style={{
          borderRadius: "20px",
        }}
        animation="wave"
        variant="h4"
        width={230}
        height={40}
      />
    </div>
  );
};

export default MainSkeleton;
