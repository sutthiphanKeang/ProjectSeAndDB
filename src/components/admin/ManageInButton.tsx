import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

type props = {
  in_id?: any;
  name?: any;
  info?: any;
  class_?: any;
  cost?: any;
  loaded?: boolean;
  setLoad?: any;
};

const ManageInButton: React.FC<props> = ({
  in_id,
  name,
  info,
  cost,
  class_,
  loaded,
  setLoad,
}) => {
  const [setonLoginadmin] = useOutletContext<any>();
  const navigate = useNavigate();
  const token = JSON.parse(
    localStorage.getItem("admin") ?? ' { "token": "" }'
  ).token;
  interface State {
    inName: string;
    inID: string;
    inDetail: string;
    inCost: number;
    inClass: string;
  }
  const [values, setValues] = React.useState<State>({
    inName: name,
    inID: in_id,
    inDetail: info,
    inCost: cost,
    inClass: class_,
    // inID:jsonObj.inID
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValues({
      inName: name,
      inID: in_id,
      inDetail: info,
      inCost: cost,
      inClass: class_,
    });
    setLoad(!loaded);
  };
  const handleClose2 = () => {
    setOpen2(false);
    setLoad(!loaded);
  };

  const handleEdit = () => {
    console.log(`handleEdit`);
    console.log("token", token);
    axios({
      method: "put",
      url: "https://carleasing.azurewebsites.net/insurance/admin/edit",
      data: {
        insurance_id: values.inID,
        insurance_name: values.inName,
        insurance_info: values.inDetail,
        insurance_price: values.inCost,
        insurance_class: values.inClass,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("regis res", response);
        return response.data;
      })

      .then((data) => console.log(data))
      .catch((error) => {
        if (error.response.status == "401") {
          localStorage.clear();
          setonLoginadmin(false);
          alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          navigate("/Admin");
        }
      })
      .then(handleClose);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = JSON.parse(
      localStorage.getItem("admin") ?? '{token:""}'
    ).token;
    console.log("token", token);
    console.log({ insurance_id: values.inID });
    axios({
      method: "delete",
      url: "https://carleasing.azurewebsites.net/insurance/admin/delete",
      data: { insurance_id: in_id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("regis res", response);
        return response.data;
      })
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.response.status == "401") {
          localStorage.clear();
          setonLoginadmin(false);
          alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          navigate("/Admin");
        }
      })
      .then(handleClose2);
  };

  return (
    <>
      <Button
        component="div"
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<EditIcon />}
        sx={{ ml: 1 }}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> กรอกที่นี่เพื่อแก้ไขแพ็คเกจ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Package Name"
            fullWidth
            variant="standard"
            value={values.inName}
            onChange={handleChange("inName")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Class"
            label="Deductible"
            fullWidth
            variant="standard"
            value={values.inClass}
            onChange={handleChange("inClass")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Detail"
            label="Insurance Detail"
            fullWidth
            variant="standard"
            value={values.inDetail}
            onChange={handleChange("inDetail")}
          />

          <TextField
            autoFocus
            margin="dense"
            id="Price"
            label="Price of Insurance"
            fullWidth
            variant="standard"
            value={values.inCost}
            onChange={handleChange("inCost")}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleEdit}>
            save
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        component="div"
        color="error"
        variant="contained"
        onClick={handleClickOpen2}
        startIcon={<DeleteIcon />}
        sx={{ ml: 1 }}
      >
        Delete
      </Button>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm to delete this insurance?"}
        </DialogTitle>

        <DialogActions>
          <Button color="primary" variant="outlined" onClick={handleClose2}>
            Cancel
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={handleDelete}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ManageInButton;
