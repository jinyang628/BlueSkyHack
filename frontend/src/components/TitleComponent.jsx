import { Typography } from "@mui/material";

const TitleComponent = () => {
  return (
    <>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          color: "black",
          margin: "4rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Virality
      </Typography>
      <Typography
        variant="h5"
        component="h5"
        sx={{
          color: "black",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        🎉 Your fame is our mission 🎉
      </Typography>
      <Typography
        variant="h5"
        component="h5"
        sx={{
          color: "black",
          margin: "1rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        👄 Your vanity, our tradition 👄
      </Typography>
    </>
  );
};

export default TitleComponent;
