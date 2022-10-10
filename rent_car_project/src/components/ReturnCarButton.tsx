import {
  ButtonBase,
  Backdrop,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
  Grid,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { animated, useSpring } from "react-spring";
import * as React from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";

interface State {
  password: string;
  showPassword: boolean;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type props = {
  title?: any;
  img?: any;
  id?: any;
  brand?: any;
  year?: any;
};
const ReturnCarButton: React.FC<props> = ({ title, img, id, brand, year }) => {
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
    setValues({
      ...values,
      password: "",
      showPassword: false,
    });
  };
  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <Button
        color="warning"
        fullWidth
        variant="contained"
        onClick={handleOpen2}
      >
        Return
      </Button>
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Return Car"}</DialogTitle>
        <DialogContent>
          <ButtonBase>
            <img
              alt="complex"
              src={`${img}?w=50&h=50&fit=crop&auto=format`}
              srcSet={`${img}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
              width="200"
              height="160"
            />
          </ButtonBase>
          <Grid item xs container direction="column" spacing={2}>
            <Grid
              item
              xs
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Typography gutterBottom variant="subtitle1" component="div">
                Brand: {brand}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Model Name: {title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Vehicle ID: {id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Model Year: {year}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "space-between", marginLeft: "2%" }}
        >
          <Typography variant="h6">Are you sure to return this car?</Typography>
        </DialogActions>
        <DialogActions>
          <FormControl sx={{ width: "25ch", mt: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <br />
          <Button variant="contained" color="success" sx={{ ml: 1, mt: 1 }}>
            Confirm
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ ml: 2, mr: 2, mt: 1 }}
            onClick={handleClose2}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ReturnCarButton;
