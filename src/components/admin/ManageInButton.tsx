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
// import React from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AnyMxRecord } from "dns";
import React, { Component, useEffect, useState } from "react";

type props = {
  // in_id?: any;
  // name?: any;
  // info?: any;
  // class_?: any;
  // cost?: any;
  packageID: any;
  packageName: any;
  packageInfo: any;
  packageCost: any;
  packageExcess: any;
  loaded?: boolean;
  setLoad?: any;
};

const ManageInButton: React.FC<props> = ({
  // in_id,
  // name,
  // info,
  // cost,
  // class_,
  packageID,
  packageName,
  packageInfo,
  packageCost,
  packageExcess,
  loaded,
  setLoad,
}) => {
  const [setonLoginadmin] = useOutletContext<any>();
  const navigate = useNavigate();
  const token = JSON.parse(
    localStorage.getItem("admin") ?? ' { "token": "" }'
  ).token;
  interface State {
    // inName: string;
    // inID: string;
    // inDetail: string;
    // inCost: number;
    // inClass: string;
    packageID: any,
    packageName: any,
    packageInfo: any,
    packageCost: any,
    packageExcess: any,
  }
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState<State>({
    packageID: packageID,
    packageName: packageName,
    packageInfo: packageInfo,
    packageCost: packageCost,
    packageExcess: packageExcess,
    // inID:jsonObj.inID
  });
  const [errorPackageName, setErrorPackageName] = useState("");
  const [errorPackageInfo, setErrorPackageInfo] = useState("");
  const [errorPackageExcess, setErrorPackageExcess] = useState("");
  const [errorPackageCost, setErrorPackageCost] = useState("");
  const handleChange =(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (prop == "packageName") {
      if (value.length == 0) {
        setErrorPackageName("Package name field should not empty! ");
      }  else if (value == " ") {
        setErrorPackageName("first character shound not be space!");
      }else{
        setErrorPackageName("");
      }
      setValues({ ...values, [prop]: value });
    } else if (prop == "packageInfo") {
      if (value.length == 0) {
        setErrorPackageInfo("Package information field should not empty! ");
      } else if (value == " ") {
        setErrorPackageInfo("first character shound not be space!");
      }else{
        setErrorPackageInfo("");
      }
      setValues({ ...values, [prop]: value });
    } else if (prop == "packageExcess") {
      if (value.length == 0) {
        setErrorPackageExcess("Package excess field should not empty!");
      } else if (/^\d+$/.test(value)) {
        setErrorPackageExcess("");
      } else if (event.target.value[0] == " ") {
        setErrorPackageExcess("first character shound not space!");
      } else {
        setErrorPackageExcess("Invalid package excess");
      }
      setValues({ ...values, [prop]: value });
    } else if (prop == "packageCost") {
      if (value.length == 0) {
        setErrorPackageCost("Package cost field should not empty!");
      } else if (/^\d+$/.test(value)) {
        setErrorPackageCost("");
      } else if (event.target.value[0] == " ") {
        setErrorPackageCost("first character shound not space!");
      } else {
        setErrorPackageCost("Invalid package cost!");
      }
      setValues({ ...values, [prop]: value });
    }
  };

    // (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setValues({ ...values, [prop]: event.target.value });
      

    // };
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
      packageID:packageID,
      packageName:packageName,
      packageInfo:packageInfo,
      packageExcess:packageExcess,
      packageCost:packageCost,
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
    if(!((!!errorPackageName)||(!!errorPackageInfo)||(!!errorPackageExcess)||(!!errorPackageCost))){axios({
      method: "put",
      url: "http://localhost:3001/package/update",
      data: {
        packageID: values.packageID,
        packageName: values.packageName,
        packageInfo: values.packageInfo,
        packageCost: values.packageCost,
        packageExcess: values.packageExcess,
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
      .then(handleClose);}
      else{setLoading(false);
        alert("กรุณาตรวจสอบข้อมูล");}
    
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = JSON.parse(
      localStorage.getItem("admin") ?? '{token:""}'
    ).token;
    console.log("token", token);
    console.log({ packageID: values.packageID });
    axios({
      method: "delete",
      url: `http://localhost:3001/package/delete/${packageID}`,
      data: { packageID: packageID },
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
          error={!!errorPackageName}
          helperText={errorPackageName}
            autoFocus
            margin="dense"
            id="packageName"
            label="Package Name"
            fullWidth
            variant="standard"
            value={values.packageName}
            onChange={handleChange("packageName")}
          />
          <TextField
          error={!!errorPackageExcess}
          helperText={errorPackageExcess}
            autoFocus
            margin="dense"
            id="packageExcess"
            label="Excess"
            fullWidth
            variant="standard"
            value={values.packageExcess}
            onChange={handleChange("packageExcess")}
          />
          <TextField
          error={!!errorPackageInfo}
          helperText={errorPackageInfo}
            autoFocus
            margin="dense"
            id="packageInfo"
            label="package info"
            fullWidth
            variant="standard"
            value={values.packageInfo}
            onChange={handleChange("packageInfo")}
          />

          <TextField
          error={!!errorPackageCost}
          helperText={errorPackageCost}
            autoFocus
            margin="dense"
            id="packageCost"
            label="Price of package"
            fullWidth
            variant="standard"
            value={values.packageCost}
            onChange={handleChange("packageCost")}
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
