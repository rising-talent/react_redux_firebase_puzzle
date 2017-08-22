import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Menu, { MenuItem } from 'material-ui/Menu';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../redux/action'
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import FaTrophy from 'react-icons/lib/fa/trophy'
import Header from '../../component/header'
const person = require('../../resource/images/person.png')
require('./index.css')

class TopPlayers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openModal: false
        }
    }

    onActionSelected(player, actionTitle){
        this.setState({openModal: false})
        alert(actionTitle)
    }

    render() {
        const _this = this
        return (
            <div className="container">
                <Header/>
                <Grid container spacing={0}>
                    <Grid item sm={2}/>
                    <Grid item xs={12} sm={8}>
                        <Grid item xs={12}>
                            <center className="rankingTitle">Top Players</center>
                        </Grid>
                        <Grid item xs={12} className="header-cell-row">
                            <Grid item xs={1} className="header-cell" style={styles.cell}>NO</Grid>
                            <Grid item xs={2} className="header-cell" style={styles.cell}>Trophy</Grid>
                            <Grid item xs={3} className="header-cell" style={styles.cell}>UserName</Grid>
                            <Grid item xs={4} className="header-cell" style={styles.cell}>Email</Grid>
                            <Grid item xs={2} className="header-cell-action" style={styles.cell}>Actions</Grid>
                        </Grid>
                        {
                            this.props.top_players.map(function(player, index){
                                const isMe = _this.props.userInfo.username == player.username
                                const colorStyle = {color: isMe ? 'yellow' : 'white', paddingLeft: 10, paddingRight: 10}
                                return(
                                    <Grid item xs={12} key={index} className="tableRow">
                                        <Grid item xs={1} className="table-cell" style={colorStyle}><div>{index + 1}</div></Grid>
                                        
                                        <Grid item xs={2} className="table-cell" style={colorStyle}>
                                            <div className="row">
                                                <FaTrophy size={20} className="trophyIcon"/>
                                                {player.trophy}
                                            </div>
                                        </Grid>             
                                        <Grid item xs={3} className="table-cell" style={colorStyle}>
                                            <div className="row">
                                                <img src={player.image == '' || player.image == undefined?person:player.image} className="photo"/>
                                                {player.username}
                                            </div>
                                        </Grid>                       
                                        <Grid item xs={4} className="table-cell" style={colorStyle}>{player.email == '' || player.email == undefined ? 'None': player.email}</Grid>
                                        <Grid item xs={2} className="table-cell-action" style={styles.cell}>
                                            <div>
                                                {
                                                    isMe?null
                                                    :
                                                    <div>
                                                        <Button raised color="accent" onClick={(e) => _this.setState({ openModal: true, anchorEl: e.currentTarget })}>
                                                            Actions
                                                        </Button>
                                                        <Menu
                                                            anchorEl={_this.state.anchorEl}
                                                            open={_this.state.openModal}
                                                            onRequestClose={() => _this.setState({ openModal: false })}
                                                        >
                                                            <MenuItem><span style={{color: 'blue'}}>{'Actions for ' + player.username}</span></MenuItem>
                                                            <MenuItem onClick={() => _this.onActionSelected(player, 'Add to Favorites')}>Add to Favorites</MenuItem>
                                                            <MenuItem onClick={() => _this.onActionSelected(player, 'Remove from Favorites')}>Remove from Favorites</MenuItem>
                                                            <MenuItem onClick={() => _this.onActionSelected(player, 'Invite')}>Invite</MenuItem>
                                                            <MenuItem onClick={() => _this.onActionSelected(player, 'Edit')}>Edit</MenuItem>
                                                            <MenuItem onClick={() => _this.onActionSelected(player, 'Report')}>Report</MenuItem>
                                                        </Menu>
                                                    </div>
                                                }                                                            
                                            </div>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <Grid item sm={2}/>    
                </Grid>
            </div>
        );
    }
}

const styles = {
    cell: {
        paddingLeft: 10,
        paddingRight: 10
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        userInfo: state.loginReducer.userInfo,
        top_players: state.rankingReducer.top_players,
    }
}, mapDispatchToProps)(TopPlayers);