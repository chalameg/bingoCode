import React from "react";
import { Box } from "@mui/material";

const BlogCard = ({ image, title, description }) => {
  return (
    <Box sx={{ background: "white" }} borderRadius="10px" padding="5px">
      <img
        src={image}
        alt="Blog 1"
        style={{ marginBottom: "10px" }}
        width="100%"
      />
      <Box padding="5px" color="black" mb={2}>
        <Box fontSize="24px" fontWeight="700" lineHeight="36px" mb={2}>
          {title}
        </Box>
        <Box fontSize="16px" fontWeight="400" lineHeight="19px">
          {description}
        </Box>
      </Box>

      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #7F5AEF",
          filter: "drop-shadow(1px 1px 13px rgba(127, 90, 239, 0.49))",
          borderRadius: "10px",
          background: "white",
          color: "#7F5AEF",
          fontSize: "20px",
          height: "50px",
          width: "100%",
          boxShadow: "none",
          margin: 0,
        }}
      >
        Learn More
      </button>
    </Box>
  );
};

export default BlogCard;
