import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddInsurance from "./AddInsurance";
import ManageIN from "./ManageIn";
import ManageCar from "./ManageCar";
import AddCar from "./AddCar";
import { useNavigate , useOutletContext} from "react-router-dom";
import CheckSlip from "./CheckSlip";
import { useEffect } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//หน้าหลักสำหรับหน้า admin
export default function BasicTabs() {
  const [onLoginadmin] = useOutletContext<any>();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // useEffect(() =>{
  //   if (!onLoginadmin){
  //     navigate("/Admin")
  //   }
  // },[onLoginadmin])

  console.log("admin", onLoginadmin)
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="จัดการรถ" {...a11yProps(0)} />
          <Tab label="จัดการแพ็คเกจ" {...a11yProps(1)} />
          <Tab label="เพิ่มรถ" {...a11yProps(2)} />
          <Tab label="เพิ่มแพ็คเกจ" {...a11yProps(3)} />
          <Tab label="ตรวจสอบสลิป" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ManageCar/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ManageIN/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddCar/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AddInsurance/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CheckSlip/>
      </TabPanel>
    </Box>
  );
}
