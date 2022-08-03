import { Box, Paper, Typography, Tabs, Tab } from '@material-ui/core'
import React from 'react'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export const Tabber = ({ tabs, value, onChange }) => {
  return (
    <div>
      <Paper>
        <Tabs
          value={value}
          onChange={onChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
        >
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              label={tab.title}
              disabled={tab?.disabled}
              {...a11yProps(i)}
              onClick={tab?.onClick}
            />
          ))}
        </Tabs>
      </Paper>
      {tabs.map((tab, i) => (
        <TabPanel value={value} index={i}>
          {tab.content}
        </TabPanel>
      ))}
    </div>
  )
}
