import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const ClickButton = ({ onClick, children }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        marginRight: "1rem",
        marginTop: "1rem",
        borderRadius: "1rem",
      }}
    >
      {children}
    </Button>
  );
};

ClickButton.propTypes = {
  onClick: PropTypes.func.isRequired, // onClick is a function and is required
  children: PropTypes.node.isRequired, // children can be anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
};

export default ClickButton;
