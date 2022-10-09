import {
  Box,
  Button,
  ButtonBase,
  Container,
  Grid,
  List,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import RentCarButton from "./RentCarButton";

export default function ReturnCar() {
  const [data2, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:5500/vehicle")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#E5E7E9 ",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Container fixed>
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <TextField
          className="search-bar"
          sx={{ mt: 5, mb: 5 }}
          size="small"
          id="Search-basic"
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Box>
      <div className="test-div">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 500,
            }}
          >
            {data2.map((item, index) => (
              <Item>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase>
                      <img
                        alt="complex"
                        src={`${item.vehicle_img}?w=50&h=50&fit=crop&auto=format`}
                        srcSet={`${item.vehicle_img}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
                        width="200"
                        height="160"
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid
                        item
                        xs
                        sx={{ alignItems: "center", justifyContent: "center" }}
                      >
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          Brand: {item.brand}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Model Name: {item.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Vehicle ID: {item.vehicle_id}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Model Year: {item.year}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item alignItems="center" justifyContent="center">
                      <RentCarButton
                        title={item.brand}
                        img={item.vehicle_img}
                        id={item.vehicle_id}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Item>
            ))}
          </List>
        </Stack>
      </div>
    </Container>
  );
}
