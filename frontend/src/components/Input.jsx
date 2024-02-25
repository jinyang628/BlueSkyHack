import TextField from "@mui/material/TextField";

const TextInput = ({ label, value, onChange }) => {
  return (
    <div style={{ display: "flex" }}>
      {" "}
      {/* Flex container */}
      <TextField
        label={label} // Label text for the input
        variant="outlined" // Style variant, "outlined" in this case
        value={value} // Controlled value
        onChange={onChange} // Handler to update the value
        fullWidth
        multiline
        rows={15}
        inputProps={{
          maxLength: 300 // Set maximum character length
        }}
        helperText={`${value.length}/300`} // Show current character count / max
        sx={{
          "& .MuiOutlinedInput-root": {
            fontSize: "1.25rem",
            backgroundColor: "white", // Change the backgroundColor here
          },
        }}
        size="large"
      />
    </div>
  );
};

export default TextInput;
