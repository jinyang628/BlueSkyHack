import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const TextInput = ({ label, value, onChange }) => {
  return (
    <div style={{ display: "flex" }}>
      {" "}
      {/* Flex container */}
      <TextField
        label={label} // Label text for the input
        variant="filled" // Style variant, "outlined" in this case
        value={value} // Controlled value
        onChange={onChange} // Handler to update the value
        fullWidth
        multiline
        rows={15}
        inputProps={{
          maxLength: 300, // Set maximum character length
        }}
        helperText={`${value.length}/300`} // Show current character count / max
        sx={{
          fontSize: "1.25rem",
          backgroundColor: "white", // Change the backgroundColor here
        }}
        size="large"
      />
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string, // label is a string
  value: PropTypes.string.isRequired, // value is a string and is required
  onChange: PropTypes.func.isRequired, // onChange is a function and is required
};

export default TextInput;
