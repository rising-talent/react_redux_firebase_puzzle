import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as firebase from "firebase";
import { ActionCreators } from '../../redux/action'
import * as Global from '../../lib/constant'
import Button from 'material-ui/Button';
import FaTrophy from 'react-icons/lib/fa/trophy'
import ProgressButton from 'react-progress-button'
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
  DialogTitle,
} from 'material-ui/Dialog';
require('./index.css')

class Check extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        if(!this.props.isSuccess && this.getLeftTimes() == 0){
            this.onFail()
        }
    }
    
    getLeftTimes() {
        return this.props.level * 2 - 1 - this.props.times
    }

    onFail() {
        const _this = this
        const {userInfo} = this.props
        const n_trophy = userInfo.trophy + this.getMTrophy()
        userInfo['trophy'] = n_trophy

        this.props.updateUserTrophy(userInfo, (res) => {            
            _this.props.saveStorage('account', userInfo, (res) => {
                //
            })
            _this.props.setUserData(userInfo)
        })
    }

    onReceive(left) {
        const _this = this
        let {userInfo} = this.props
        this.setState({isReceiving: true})
        const n_trophy = userInfo.trophy + this.getPTrophy(left)       
        userInfo['trophy'] = n_trophy

        this.props.updateUserTrophy(userInfo, (res) => {            
            _this.props.saveStorage('account', userInfo, (res) => {
            })
            _this.props.setUserData(userInfo)
            _this.tryAgain()
        })
    }

    onRegister() {
        const left = this.getLeftTimes()
        alert(left)
    }

    onBack() {
        this.props.goBack()
    }

    tryAgain() {
        this.props.tryAgain()
    }

    getMTrophy() {        
        return 0 - this.props.level * 4
    }

    getPTrophy(left) {
        return this.props.level * 3 + left * 2
    }

    render() {
        let left = this.getLeftTimes()
        const {isSuccess, leftTimes, yNumber, nNumber, goalNumber, level} = this.props
        let leftTextStyle = {}
        if(left < level){
            leftTextStyle = {
                padding: 40,
                fontSize: 24,
                fontWeight: 'bold',
                color: 'red'
            }
        }
        else{
            leftTextStyle = {
                padding: 40,
                fontSize: 24,
                fontWeight: 'bold',
                color: 'blue'
            }
        }
        const text1 = "Input your username"
        return (
            <div className="check_container">
                <Dialog open={this.state.openModal} onRequestClose={() => this.setState({openModal: false})}>
                        <DialogTitle>
                            {
                                <div>
                                    Hi
                                </div>
                            }
                        </DialogTitle>
                    </Dialog>
                <Grid container spacing={24}>
                    
                    {
                        isSuccess ?
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <center className="check_welcomeText">Congratulations</center>
                                <center className="check_welcomeText">You have guessed it!</center>
                            </Grid>
                            <Grid item xs={12}>
                                <center>
                                    <div style={styles.trophyView}>
                                        <FaTrophy size={60} className="check_trophyIcon"/>
                                        {this.getPTrophy(left)}
                                    </div>
                                </center>
                            </Grid>
                            {
                                this.props.userInfo.username.length == 0?
                                <Grid item xs={12}>
                                    <Grid item xs={12}>
                                        <center>
                                            {
                                                this.state.isReceiving?
                                                <CircularProgress color='white'/>
                                                :
                                                <Button raised color="primary" style={styles.registerButton} onClick={() => this.setState({openModal: true})}>
                                                    Register
                                                </Button>
                                            }                                    
                                        </center>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <center>
                                            {
                                                this.state.isReceiving?
                                                <CircularProgress color='white'/>
                                                :
                                                <Button raised color="accent" style={styles.registerButton} onClick={() => this.tryAgain()}>
                                                    Don't Register
                                                </Button>
                                            }                                    
                                        </center>
                                    </Grid>
                                </Grid>
                                :
                                <Grid item xs={12}>
                                    <center>
                                        {
                                            this.state.isReceiving?
                                            <CircularProgress color='white'/>
                                            :
                                            <Button raised color="primary" onClick={() => this.onReceive(left)}>
                                                Receive
                                            </Button>
                                        }                                    
                                    </center>
                                </Grid>
                            }
                            
                        </Grid>
                        :left == 0?
                        <Grid item xs={12}>
                            <Grid item xs={12} style={{margin: 0, paddingTop: 50}}>
                                <center className="check_failText">You are failed!</center>
                                <center className="check_failText">The goal number was</center>
                                <center className="check_failText">{goalNumber}</center>
                            </Grid>
                            <Grid item xs={12}>
                                <center>
                                    <div style={styles.failTrophyView}>
                                        <FaTrophy size={60} className="check_trophyIcon"/>
                                        {this.getMTrophy()}
                                    </div>
                                </center>
                            </Grid>
                            <Grid item xs={12}>
                                <center>
                                    <Button raised color='accent' style={styles.registerButton} onClick={() => this.tryAgain()}>
                                        Try Again
                                    </Button>
                                </center>
                            </Grid>
                        </Grid>
                        :
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <center style={leftTextStyle}>{left} times left</center>
                                <center className="check_welcomeText">{Global.notifyText[this.props.yNumber]}</center>
                                <center className="check_welcomeText">Y {this.props.yNumber}, N {this.props.nNumber}</center>
                                <Grid container align='center' justify='center' direction='row'>
                                    <Grid item xs={11} sm={6}>
                                        <div className="check_explain">
                                            <div className="check_normalText">'Y' - means the number of the correct digits you guessed for both of the position and digit.</div>
                                            <div className="check_normalText">'N' - means the number of the correct digits you guessed for the position only.</div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container align='center' justify='center' direction='row'>
                                    <Grid item>
                                    <Button raised color='accent' style={styles.registerButton} onClick={() => this.onBack()}>
                                        Back to Home
                                    </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                    
                    
                </Grid>
            </div>
        );
    }
}

const styles = {
    buttonText: {
        fontSize: 30,
        padding: 20,
    },
    backButton: {
        width: 'relative',
        height: 60,
        backgroundColor: 'lightgray',
        marginTop: 20
    },
    trophyView: {
        flexDirection: 'row', 
        color: '#CCC', 
        padding: 30, 
        fontSize: 40
    },
    registerButton: {
        margin: 30,
        width: 360,
        height: 60,
        fontSize: 30,
        borderRadius: 60
    },
    failTrophyView: {
        flexDirection: 'row', 
        color: '#444', 
        padding: 30, 
        fontSize: 40,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        goalNumber: state.loginReducer.goal,
        userInfo: state.loginReducer.userInfo,
        yNumber: state.checkReducer.yNumber,
        nNumber: state.checkReducer.nNumber,
        history: state.loginReducer.history,
        times: state.checkReducer.times,
        isSuccess: state.loginReducer.isSuccessed,
        level: state.loginReducer.level
    }
}, mapDispatchToProps)(Check);