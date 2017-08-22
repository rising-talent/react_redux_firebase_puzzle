import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as firebase from "firebase";
import { ActionCreators } from '../../redux/action'
import Tabs, {Tab} from 'material-ui/Tabs';
import { CircularProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import TopPlayers from '../ranking'
import Setting from '../setting'
import Header from '../../component/header'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
require('./index.css')

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            num: '',
            tabIndex: 0,
            goingToCheck: false
        }
    }

    componentDidMount() {
        if(this.props.times > 0 && !this.props.isFailed){
            this.setState({isLoading: false})
        }
        else{
            this.props.loadUserData((userData) => {
                if(userData !== 'error'){
                    this.signIn(userData)
                }
                else{
                    this.setState({isLoading: false})
                }
                
            })      
        }        
    }

    loadTopPlayers() {
        //get top players
        const _this = this
        this.props.getTopPlayers((size) => {
            _this.setState({isLoading: false})
        })
    }

    async signIn(userData) {
        const _this = this
        const email = userData.username + '@litiyan.com'
        const pwd = 'passwordof' + userData.username
        let user = await firebase.auth().signInWithEmailAndPassword(email, pwd);
        this.props.getUserData(user.uid, (data) => {
            data['userId'] = user.uid
            this.props.setUserData(data)
            localStorage.setItem('account', JSON.stringify(data));
            this.loadTopPlayers()
        })      
    }

    onChangeNumber(e) {      
        const re = /^[0-9\b]+$/;
        if (e.target.value == '' || re.test(e.target.value)) {
            this.setState({num: e.target.value})
        }
    }

    handleTabChange = (e, tabIndex) => {
        this.setState({ tabIndex });
        console.log(e)
        if(tabIndex == 2 && this.settingHandler !== undefined){
            this.settingHandler.init(this.settingHandler)
        }
    };
    
    render() {
        const _this = this
        return (
            <div className="container">
                <Header/>
                {
                    this.state.isLoading?
                    <div className="loadingView">
                        <CircularProgress color='accent' className='progressBar'/>
                    </div>
                    :
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <center>
                                <input className="number" type="text" value={this.state.num} onChange={(e) => this.onChangeNumber(e)} maxLength={this.props.level} name="name" />
                            </center>
                        </Grid>
                        <Grid item xs={2}/>
                        <Grid item xs={8} className="explain">
                                <center>
                                    {
                                        this.props.inProg?
                                        <div className='historyView'>
                                            <List>
                                                {
                                                    this.props.history.map(function(history, index){
                                                        const Node1 = 
                                                        <div style={styles.historyText}>
                                                            {history.number}
                                                        </div>
                                                        const Node2 = 
                                                        <div style={styles.historyText}>
                                                            {history.state}
                                                        </div>
                                                        return (
                                                            <ListItem key={index}>
                                                                <Grid container spacing={0}>
                                                                    <Grid item xs={6}>
                                                                        <ListItemText primary={Node1}/>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <ListItemText primary={Node2}/>
                                                                    </Grid>
                                                                </Grid>
                                                            </ListItem>
                                                        )
                                                    })
                                                }
                                            </List>
                                        </div>
                                        :
                                        'Hi, I thought a random number of ' + this.props.level + ' digits. Now you must guess the number correclty by checking '
                                        + (this.props.level * 2 - 1) + " times at maximum. Let's get started!"
                                    }
                                </center>
                        </Grid>
                        <Grid item xs={2}/>
                        <Grid item xs={12}>
                            <center>
                                {
                                    this.state.num.length == this.props.level?
                                    <Button raised color='accent' style={styles.checkButton} onClick={() => this.onCheck()}>
                                        Check
                                    </Button>
                                    :null
                                }           
                            </center>                  
                        </Grid>
                    </Grid>
                    
                }
            </div>
        );
    }

    onCheck() {
        if(JSON.stringify(this.props.history).indexOf(this.state.num) >= 0){
            alert('This number was already checked by you!')
            return
        }
        this.props.check(this.state.num, this.props.goalNumber, this.props.times, this.props.history)
        this.props.gotoPage('check')
    }
}

const styles = {
    checkButton: {
        margin: 30,
        width: 300,
        height: 70,
        fontSize: 30,
        borderRadius: 70
    },
    historyText: {
        fontSize: 30,
        color: 'white'
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        goalNumber: state.loginReducer.goal,
        userInfo: state.loginReducer.userInfo,
        level: state.loginReducer.level,
        history: state.loginReducer.history,
        top_players: state.rankingReducer.top_players,
        complexity: state.loginReducer.isComplex,
        times: state.checkReducer.times,
        isFailed: state.loginReducer.isFailed,
        inProg: state.loginReducer.inProg
    }
}, mapDispatchToProps)(Login);