import React from "react";
import Button from "@material-ui/core/Button";

const ButtonComponent = props => {
  const { id,variant, color, disabled, className, size, onClick, style } = props;
  return (
    <Button
      id={id}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      className={className}
      onClick={onClick}
      style={style}
    >
      {props.children}
    </Button>
  );
};

export default ButtonComponent;
