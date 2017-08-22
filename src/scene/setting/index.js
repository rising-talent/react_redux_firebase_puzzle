import React, { Component, PropTypes } from 'react';
import Grid from 'material-ui/Grid';
import ImageUploader from 'react-firebase-image-uploader';
import * as firebase from "firebase";
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import green from 'material-ui/colors/green';
//import Slider from 'material-ui/Slider';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../redux/action'
import Header from '../../component/header'
require('./index.css')
const person = require('../../resource/images/person.png')

class Setting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: this.props.userInfo.email,
            isUploading: false,
            progress: 0,
            avatarURL: this.props.userInfo.image == undefined?'':this.props.userInfo.image,
            level: this.props.level,
            complexity: this.props.complexity,
            tempFileName: ''//temp file name
        }
    }

    render() {
        const _this = this
        return (
            <div className="container">
                <Header />
                <Grid container spacing={0} className='settingView'>
                    <Grid item sm={2}/>
                    <Grid item xs={12} sm={8}>
                        <Grid item xs={12}>
                            <center>
                                <div>
                                    <ImageUploader
                                        className="avatarController"
                                        name="avatar"
                                        ref={(ref) => this.uploadButton = ref}
                                        storageRef={firebase.storage().ref('images')}
                                        onUploadStart={this.handleUploadStart}
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={this.handleUploadSuccess}
                                        onProgress={this.handleProgress}
                                    />
                                    <label>
                                        <input type="file" ref={(ref) => this.fileEvent = ref} onChange={(event) => this.onChangePhoto(event)}/>
                                        <img className="avatarImage" src={this.state.avatarURL.length > 0?this.state.avatarURL:person} />
                                    </label>
                                </div>
                                <div>
                                    {
                                        this.state.isUploading?
                                        <center className="progressText">{'Uploading...' + this.state.progress + '%'}</center>
                                        :this.state.progress == 100?
                                        <center className="progressText">Photo will be saved automatically when you clicked the save button below</center>
                                        :null

                                    }
                                
                                </div>
                            </center>
                                
                        </Grid>
                        <Grid item xs={12} className='setting-row'>
                            <Grid item xs={4}>
                                <div className="section-title">
                                    Username:
                                </div>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="section">
                                    {this.props.userInfo.username == ''?'NONE':this.props.userInfo.username}
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className='setting-row'>
                            <Grid item xs={4}>
                                <div className="section-title" style={{height: 50}}>
                                    Email:
                                </div>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="section" style={{height: 20}}>
                                    <TextField
                                        id="email"
                                        label='Input your email address'
                                        fullWidth
                                        labelClassName='numberLabel'
                                        inputClassName='numberInput'
                                        style={{height: 50, backgroundColor: 'transparent'}}
                                        value={this.state.email}
                                        onChange={event => this.setState({ email: event.target.value })}
                                        margin="dense"
                                    />
                                </div>
                                
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className='setting-row'>                                  
                            <Grid item sm={12} lg={4}>
                                <div className="section-title">
                                    level: {this.state.level}
                                </div>
                            </Grid>
                            <Grid item sm={12} lg={8}>
                                <div>
                                </div>
                            </Grid>                                            
                        </Grid>
                        <Grid item xs={12} className='setting-row'>
                            <Grid item xs={4}>     
                                <div className="section-title">
                                    Complexity:
                                </div>
                            </Grid>
                            <Grid item xs={8}>     
                                <div className="section">
                                    <Switch
                                    classes={{
                                        checked: {
                                            color: green[500],
                                            '& + $bar': {
                                            backgroundColor: green[500],
                                            },
                                        },
                                        bar: {},
                                    }}
                                    checked={this.state.complexity}
                                    onChange={(e, checked) => this.setState({complexity: checked})}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}> 
                            <center>
                                <Button style={styles.saveButton} color="accent" className="saveButton" onClick={() => this.saveSettings()}>
                                    <span className='buttonText'>Save</span>
                                </Button>
                            </center>
                        </Grid>
                    </Grid>
                    <Grid item sm={2}/>
                </Grid>
            </div>
        );
    }

    onChangePhoto(event) {
        const _this = this
        const ValidTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/JPG', 'image/PNG', 'image/JPEG']
        if(ValidTypes.indexOf(event.target.files[0].type) < 0){
            alert('Invalid File Type!')
            return
        }
        this.uploadButton.handleImageSelection(event)
        let selectedFile = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function(event) {
            _this.setState({avatarURL: event.target.result});
        };
        reader.readAsDataURL(selectedFile);
    }

    removeLastFile() {
        if(this.state.fileName.length == 1) return []
        else return this.state.fileName.splice(-1, 1)
    }

    getFileName(fileURL) {
        return fileURL.split('%2F')[1].split('?')[0]
    }

    saveSettings() {
        const _this = this
        this.props.setLevel(this.state.level)
        this.props.setComplexity(this.state.complexity)  


        let userData = this.props.userInfo
        if(userData.image !== this.state.avatarURL || this.state.email !== this.props.userInfo.email){
            if(userData.image.length > 0){
                let filename = this.getFileName(userData.image)
                this.props.deleteTempFile(filename)
                console.log('previous image has been deleted')
            }
            userData['email'] = this.state.email
            userData['image'] = this.state.imageURL
            this.props.updateData(userData)
        }      

        let data = {
            level: this.state.level,
            complexity: this.state.complexity
        }
        this.props.saveStorage('setting', data, (res) => {
            _this.props.gotoPage('/')
        })
    }

    handleSecondSlider = (event, value) => {
        this.setState({level: value});
    };

    onToggleListener = (event, state) => {
        this.setState({complexity: state})
    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0})
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        const _this = this        
        this.props.uploadImage(filename, (url) => {
            this.setState({imageURL: url})
            if(this.state.tempFileName == ''){
                this.state.tempFileName = this.getFileName(url)
                console.log('tempFileName', this.getFileName(url))
            }
            else{
                this.props.deleteTempFile(this.state.tempFileName)
                this.state.tempFileName = this.getFileName(url)
            }
            _this.setState({progress: 100, isUploading: false});
        })
    };
}



const styles = {
    saveButton: {
        borderRadius: 20, 
        backgroundColor: '#3F51B5'
    },
    saveText: {
        fontSize: 30,
        padding: 30,
    },
    thumbOff: {
        backgroundColor: '#ffcccc',
    },
    trackOff: {
        backgroundColor: '#ff9d9d',
    },
    thumbSwitched: {
        backgroundColor: 'rgb(255, 64, 129)',
    },
    trackSwitched: {
        backgroundColor: '#ff9d9d',
    },
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        userInfo: state.loginReducer.userInfo,
        level: state.loginReducer.level,
        complexity: state.loginReducer.isComplex
    }
}, mapDispatchToProps)(Setting);