import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, CardContent } from "@mui/material";
import Insurance from "./Insurance";

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="จัดการรถ" {...a11yProps(0)} />
          <Tab label="จัดการประกัน" {...a11yProps(1)} />
          <Tab label="เพิ่มรถ" {...a11yProps(2)} />
          <Tab label="เพิ่มประกัน" {...a11yProps(3)} />
          <Tab label="ตรวจสอบสลิป" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        จัดการรถ
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Insurance/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        เพิ่มรถ
      </TabPanel>
      <TabPanel value={value} index={3}>
        เพิ่มประกัน
      </TabPanel>
      <TabPanel value={value} index={4}>
        ตรวจสอบสลิป
      </TabPanel>
    </Box>
  );
}
