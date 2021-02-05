import {
    AppBar,
    Tabs,
    Tab,
    makeStyles,
    Typography,
    Box,
    Fab,
    Menu,
    MenuItem,
    Grid,
    Drawer,
    InputLabel,
    Select,
    FormControl,
    Button,
    Chip,
    Paper,
} from '@material-ui/core';
import Head from 'next/head';
import React, { useState } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import Popularity from '../components/Popularity';

function TabPanel(props) {
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
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        height: '100vh',
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
    },
    menu: {
        position: 'fixed',
        top: 10,
        left: 10,
    },
    tabs: {
        padding: theme.spacing(1),
    },
    chips: {
        margin: `0 4em`,
        padding: theme.spacing(1),
    },
    chip: {
        marginRight: theme.spacing(1),
        minWidth: 80,
    },
    drawer: {
        padding: theme.spacing(2),
        minWidth: 250,
    },
    formControl: {
        marginBottom: theme.spacing(1),
        minWidth: '2em',
    },
}));

interface DrawerProps {
    open: boolean;
    variant?: 'limitations';
}

interface Filters {
    language?: string;
    framework?: string;
    cost?: string;
    control?: string;
}

export const Home = (): JSX.Element => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [drawer, setDrawer] = useState<DrawerProps>({ open: false });
    const [filters, setfilters] = useState<Filters>({
        language: 'javascript',
        framework: 'react',
        cost: 'free',
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleHover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Head>
                <title>Chart Paralysis</title>
            </Head>
            <main className={classes.root}>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                >
                    <div onMouseLeave={handleClose}>
                        <MenuItem
                            onClick={() => {
                                setDrawer({
                                    open: true,
                                    variant: 'limitations',
                                });
                                handleClose();
                            }}
                        >
                            Limitations
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setDrawer({ open: true });
                                handleClose();
                            }}
                        >
                            Filters
                        </MenuItem>
                    </div>
                </Menu>
                <Fab
                    color="primary"
                    aria-label="Filters"
                    onMouseEnter={handleHover}
                    className={classes.menu}
                >
                    <FilterListIcon />
                </Fab>
                <Paper className={classes.chips}>
                    {filters.language && (
                        <Chip
                            onDelete={() =>
                                setfilters({ ...filters, language: null })
                            }
                            className={classes.chip}
                            label={filters.language}
                        ></Chip>
                    )}
                    {filters.framework && (
                        <Chip
                            onDelete={() =>
                                setfilters({ ...filters, framework: null })
                            }
                            className={classes.chip}
                            label={filters.framework}
                        ></Chip>
                    )}
                    {filters.cost && (
                        <Chip
                            onDelete={() =>
                                setfilters({ ...filters, cost: null })
                            }
                            className={classes.chip}
                            label={filters.cost}
                        ></Chip>
                    )}
                    {filters.control && (
                        <Chip
                            onDelete={() =>
                                setfilters({ ...filters, control: null })
                            }
                            className={classes.chip}
                            label={filters.control}
                        ></Chip>
                    )}
                </Paper>
                <Drawer
                    open={drawer.open}
                    onClose={() => setDrawer({ open: false })}
                >
                    {drawer.variant === 'limitations' && (
                        <Grid container className={classes.drawer}>
                            <Grid item xs={12}>
                                <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                >
                                    <InputLabel id="language-label">
                                        Language
                                    </InputLabel>
                                    <Select
                                        labelId="language-label"
                                        id="language"
                                        defaultValue="react"
                                        variant="filled"
                                    >
                                        <MenuItem value="javascript">
                                            JavaScript
                                        </MenuItem>
                                        <MenuItem value="python'">
                                            Python
                                        </MenuItem>
                                        <MenuItem value="c#">C#</MenuItem>
                                        <MenuItem value="java">Java</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                >
                                    <InputLabel id="framework-label">
                                        Framework
                                    </InputLabel>
                                    <Select
                                        labelId="framework-label"
                                        id="framework"
                                        defaultValue="react"
                                        variant="filled"
                                    >
                                        <MenuItem value="angular">
                                            Angular
                                        </MenuItem>
                                        <MenuItem value="react'">
                                            React
                                        </MenuItem>
                                        <MenuItem value="svelte">
                                            Svelte
                                        </MenuItem>
                                        <MenuItem value="vue">Vue</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                >
                                    <InputLabel id="costs-label">
                                        Cost
                                    </InputLabel>
                                    <Select
                                        labelId="costs-label"
                                        id="costs"
                                        variant="filled"
                                    >
                                        <MenuItem value="free">Free</MenuItem>
                                        <MenuItem value="paid'">Paid</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                >
                                    <InputLabel id="control-label">
                                        Control
                                    </InputLabel>
                                    <Select
                                        labelId="control-label"
                                        id="control"
                                        variant="filled"
                                    >
                                        <MenuItem value="plugandplay">
                                            Plug & Play
                                        </MenuItem>
                                        <MenuItem value="custom'">
                                            Custom
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                alignItems="flex-end"
                                justify="flex-end"
                                container
                            >
                                <Button color="secondary" variant="contained">
                                    Cancel
                                </Button>
                                <Button color="primary" variant="contained">
                                    Apply
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Drawer>
                <Grid container className={classes.tabs}>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="simple tabs example"
                        >
                            <Tab label="Popularity" {...a11yProps(0)} />
                            <Tab label="Maintained" {...a11yProps(1)} />
                            <Tab label="Charts" {...a11yProps(2)} />
                            <Tab label="Example Code" {...a11yProps(3)} />
                            <Tab label="Overall" {...a11yProps(4)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <Popularity></Popularity>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Maintained
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Charts
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Example Code
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Overall
                    </TabPanel>
                </Grid>
            </main>
        </>
    );
};
export default Home;
