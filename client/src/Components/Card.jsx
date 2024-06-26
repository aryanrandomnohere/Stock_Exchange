import React from "react";
import { Card } from "flowbite-react";
import { cardTheme } from "../theme";

const CardComponent = ({ children, className }) => {
  return (
    <Card theme={cardTheme} className={className}>
      <div>{children}</div>
    </Card>
  );
};

export default CardComponent;
