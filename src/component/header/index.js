import React, { Component } from 'react';
import { Link } from 'react-router'
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../redux/action'
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import FaBars from 'react-icons/lib/fa/bars'
import Menu, { MenuItem } from 'material-ui/Menu';
require('./index.css')
class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        
    }

    onActionSelected(screenName) {
        switch(screenName){
            case 'Home':
                this.props.gotoPage('/')
                break
            case 'Top Players':
                this.props.gotoPage('top_players')
                break
            case 'Setting':
                this.props.gotoPage('setting')
                break
            default:
        }
    }

    render() {
        return (
            <Grid container style={styles.container} spacing={0}>
                    <Grid item xs={8}>
                        <div className='header-titleView'>
                            <Link to='/' style={styles.title}>{this.props.userInfo.username.length == 0?'Hello!': 'Hello, ' + this.props.userInfo.username + '!'}</Link>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className='header-moreButtonView'>
                            <Button raised color="accent" onClick={(e) => this.setState({ openModal: true, anchorEl: e.currentTarget })}>
                                <FaBars size={20} style={styles.moreIcon}/>
                            </Button>
                            <Menu
                                anchorEl={this.state.anchorEl}
                                open={this.state.openModal}
                                onRequestClose={() => this.setState({ openModal: false })}
                            >
                                <MenuItem onClick={() => this.onActionSelected('Home')}>Home</MenuItem>
                                <MenuItem onClick={() => this.onActionSelected('Top Players')}>Top Players</MenuItem>
                                <MenuItem onClick={() => this.onActionSelected('Setting')}>Setting</MenuItem>
                            </Menu>
                        </div>
                    </Grid>
            </Grid>
        );
    }
}

const styles = {
    container: {
        height: 120,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'   
    },
    canvas: {
        position: 'relative'
    },
    section: {
        position: 'absolute',
        top: 0,
        left: 0,
        rigfht: 0,
        bottom: 0,
        alignItems: 'center',
        padding: 12,
        flex: 1
    },
    title:{
        fontSize: 40,
        color: 'white',
        alignItems: 'center',
        backgroundColor: 'transparent',
        textDecorationLine: 'none'
    },
    moreView: {
        position: 'absolute',
        top: 0,
        left: 0,
        rigfht: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 12,
        flex: 1
    },
    moreIcon: {
        color: 'white',
        backgroundColor: 'transparent'
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        userInfo: state.loginReducer.userInfo,
    }
}, mapDispatchToProps)(Header);