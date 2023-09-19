import {
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Character } from "../../interfaces/character";
import { store } from "../../redux/configure-store";
import EditIcon from "@mui/icons-material/Edit";

interface LabelFieldProps {
  char: Character;
  val: string;
  label: string;
  clickEvt: () => void;
}

export const LabelField: React.FC<LabelFieldProps> = (
  props: LabelFieldProps
) => {
  const { label, char, val, clickEvt } = props;
  const userID = store.getState().user.id;

  return (
    <Grid container item justifyContent="flex-start">
      <Typography
        style={{ fontSize: "18px", fontWeight: "600", fontFamily: "inherit" }}
      >
        {label}: {val}
      </Typography>
      {userID === char.userID.toString() && (
        <EditIcon className="pointer editIcon" style={{marginLeft: '10px'}} onClick={() => clickEvt()} />
      )}
    </Grid>
  );
};
