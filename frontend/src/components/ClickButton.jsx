import Button from "@mui/material/Button";

const ClickButton = ({ onClick, children }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      {children}
    </Button>
  );
};

export default ClickButton;
