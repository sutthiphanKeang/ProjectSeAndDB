import {
    ButtonBase,
    Button,
    Typography,
    Grid,
    Slide,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@mui/material";
  import * as React from "react";
  import { TransitionProps } from "@mui/material/transitions";
  
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

  type props = {
    img?: any;
    bill_id?: any;
    book_id?: any;
    total_amount?: any;
    bill_status?: any;
  };
  const PaymentButton: React.FC<props> = ({ img, bill_id, book_id,total_amount, bill_status }) => {
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => {
      setOpen2(false);
    };

    return (
      <>
        <Button
          color="error"
          fullWidth
          
          variant="contained"
          onClick={handleOpen2}
        >
          Check
        </Button>
        <Dialog
          open={open2}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose2}
          aria-describedby="alert-dialog-slide-description"
          fullWidth	
        >
          <DialogTitle>{"Payment Check"}</DialogTitle>
          <DialogContent>
            <ButtonBase>
              <img
                alt="complex"
                src={`${img}?w=50&h=50&fit=crop&auto=format`}
                srcSet={`${img}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
                width="200"
                height="210"
              />
            </ButtonBase>
            <Grid item xs container direction="column" spacing={2}>
              <Grid
                item
                xs
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <><br/></>
                <Typography variant="subtitle1" gutterBottom>
                  Bill ID: {bill_id}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                Book ID: {book_id}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                Total amount: {total_amount}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Status: {bill_status}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            style={{ justifyContent: "flex-end", marginRight: "2%" }}
          >
            <Typography variant="h6">Are you sure to return this payment?</Typography>
          </DialogActions>
          <DialogActions>
            
            <Button variant="contained" color="success" sx={{ ml: 1}}>
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ ml: 2, mr: 2 }}
              onClick={handleClose2}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  export default PaymentButton;
  