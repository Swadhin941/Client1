import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types'
import NormalUser from '../NormalUser/NormalUser';
import DesignerUser from '../DesignerUser/DesignerUser';
import AddUserForm from '../AddUserForm/AddUserForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props

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
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const AddUser = () => {
    const [value, setValue]= useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <div className='container-fluid'>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
                sx={{ width: '90vw' }}
            >
                <Tab label="Normal Users" {...a11yProps(0)} />
                <Tab label="Designer Users" {...a11yProps(1)} />
                <Tab label="Add User" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <NormalUser />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DesignerUser />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AddUserForm />
            </TabPanel>
        </div>
    );
};

export default AddUser;