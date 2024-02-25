import TextField from "@mui/material/TextField";

// Props could be extended to include things like 'label', 'placeholder', etc.
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
        fullWidth // Optional: Makes the TextField full width
        sx={{
          "& .MuiOutlinedInput-root": {
            fontSize: "1.25rem",
            padding: "10rem",
            backgroundColor: "white", // Change the backgroundColor here
          },
        }}
      />
    </div>
  );
};

export default TextInput;
