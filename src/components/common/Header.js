import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Drawer,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200
            }
        }
    },
    appBar: {
        background: '#7347ed'
    },
    list: {
        width: 250
    }
}));


function NavbarC(props) {
    const materialClasses = useStyles();
    const [drawer, setDrawer] = useState(false);

    let items = [{ link: '/', label: 'Posts' }];

    const handleSearch = (char) => {
        props.search(char);
    };

    if (props.user.token) {
        if (props.user.developer) items.push({ link: '/new', label: 'New Post' });
        items.push({ link: '/profile', label: `${props.user.userName}'s profile`});
        items.push({ link: '/logout', label: "Logout"});
        let index = items.findIndex(item => item.label === "Login");
        if (index > 0) items.splice(index, 1);
        index = items.findIndex(item => item.label === "Register");
        if (index > 0) items.splice(index, 1);
    }
    else {
        items.push({ link: '/login', label: 'Login' });
        items.push({ link: '/register', label: 'Register' });
    }
    
    items.push({ link: '/about', label: 'About' });

    const handleClick = event => {
        props.onClickNav(event);
    };

    const sideList = () => (
        <div
            className={materialClasses.list}
            role='presentation'
            onClick={() => setDrawer(false)}
        >
            <List>
                {items.map(text => (
                    <ListItem
                        onClick={() => handleClick(text.link)}
                        button
                        key={text.label}
                    >
                        {/* <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon> */}
                        <ListItemText primary={text.label} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Fragment>
            <Drawer open={drawer} onClose={() => setDrawer(false)}>
                {sideList()}
            </Drawer>
            <AppBar className={materialClasses.appBar} position='static'>
                <Toolbar>
                    <IconButton
                        edge='start'
                        className={materialClasses.menuButton}
                        color='inherit'
                        aria-label='open drawer'
                        onClick={() => setDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        className={materialClasses.title}
                        variant='h6'
                        noWrap
                    >
                        Brunodev09 Blog
                    </Typography>
                    {props.user && props.user.token ? <Typography
                        variant='h6'
                        noWrap
                        >
                        Logged as {props.user.userName}
                    </Typography> : null}
                    <div className={materialClasses.search}>
                        <div className={materialClasses.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder='Search…'
                            classes={{
                                root: materialClasses.inputRoot,
                                input: materialClasses.inputInput
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(evt) => handleSearch(evt.target.value)}
                        />
                        
                    </div>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    {}
)(NavbarC);
