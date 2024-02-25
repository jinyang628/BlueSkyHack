import Button from "@mui/material/Button";

const ClickButton = ({ onClick, children }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        marginRight: "1rem",
        marginTop: "1rem",
      }}
    >
      {children}
    </Button>
  );
};

export default ClickButton;
