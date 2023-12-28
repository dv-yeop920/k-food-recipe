import { Skeleton } from "@mui/material";
import React from "react";

const MainSkeleton = () => {
  return (
    <div>
      <Skeleton
        style={{ marginBottom: "10px" }}
        animation="wave"
        variant="image"
        height={300}
      />
      <Skeleton animation="wave" variant="h4" />
    </div>
  );
};

export default MainSkeleton;
