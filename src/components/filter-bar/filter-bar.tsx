import ClearIcon from "@mui/icons-material/Clear";
import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";

interface FilterProps {
  value: string;
  setValue: (str: string) => void;
}

export const FilterBar: React.FC<FilterProps> = (props: FilterProps) => {
  const { value, setValue } = props;
  return (
    <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
      <Grid
        item
        container
        style={{ border: "none", backgroundColor: "white" }}
        className="standardRow"
      >
        <TextField
          type="text"
          style={{ backgroundColor: "white" }}
          placeholder="Filter"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          InputProps={{
            className: "whiteBk",
            endAdornment: (
              <IconButton onClick={() => setValue("")}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};
