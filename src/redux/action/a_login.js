import * as types from './types'
import { push } from 'react-router-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

export const loadUserData = (callback) => {
    return dispatch => {
        let data = localStorage.getItem('setting');
        if(data == undefined){
            dispatch(resetGoalNumber(4, false))
        }
        else{
            const res = JSON.parse(data)
            dispatch(setLevel(res.level))
            dispatch(setComplexity(res.complexity))
            dispatch(resetGoalNumber(res.level, res.complexity))
        }
        
        dispatch(setFail(false))
        
        data = localStorage.getItem('account');
        if(data !== undefined && data !== null){
            let userData = JSON.parse(data)
            callback(userData)
        }
        else{
            callback('error')
        }
        
        
    };
}

export const gotoPage = (screenName) => {
    return dispatch => {
        browserHistory.push(screenName);
    }
}

export const tryAgain = () => {
    return dispatch => {
        dispatch(setFail(true))
        browserHistory.push('/');
    }
}

export const goBack = () => {
    return dispatch => {
        browserHistory.goBack()
    }
}

export const setFail = (data) => {
    return {
        type: types.FAIL,
        data
    }
}

export const setUserData = (data) => {
    return {
        type: types.USER_INFO,
        data
    }
}

export const resetGoalNumber = (level, isComplex) => {
    return function (dispatch) {
        let gNumber = ''
        if(isComplex){
            gNumber = String(Math.random()).substring(2, 2 + level)
        } 
        else{
            let temp = String(Math.random())
            let index = 2
            while(gNumber.length < level){
                if(gNumber.indexOf(temp.substr(index, 1)) < 0){
                    gNumber += temp.substr(index, 1)
                }
                else{
                    index++
                }
            }
        }
        dispatch(setGoalNumber(gNumber))
        dispatch(setTimes(0))
        dispatch(setHistory([]))
        dispatch(setSuccess(false))
    }
}

export const check = (num, goal, times, history) => {
    return (dispatch, getState) => {
        let Y = 0, N = 0
        for (let i = 0; i < num.length; i++) { 
            if(num.substr(i, 1) == goal.substr(i, 1)){
                Y++
            }
            else if(num.indexOf(goal.substr(i, 1)) > -1){
                N++
            }
        }
        dispatch(setY(Y))
        dispatch(setN(N))
        dispatch(setTimes(times + 1))
        if(Y == 4) dispatch(setSuccess(true))
        let temp = {
            number: num,
            state: 'Y' + Y + ', ' + 'N' + N
        }
        history.push(temp)
        dispatch(setHistory(history))
    }
}

export const setY = (y) => {
    return {
        type: types.SET_Y_NUMBER,
        data: y
    }
}

export const setN = (n) => {
    return {
        type: types.SET_N_NUMBER,
        data: n
    }
}

export function setGoalNumber(gn) {
    return {
        type: types.SET_GOAL_NUMBER,
        data: gn
    }
}

export function setTimes(t) {
    return {
        type: types.SET_TIMES,
        data: t
    }
}

export function setSuccess(state) {
    return {
        type: types.SUCCESS,
        data: state
    }
}

export function setHistory(h) {
    return {
        type: types.SET_HISTORY,
        data: h
    }
}

export const setLevel = (level) => {
    return {
        type: types.SET_LEVEL,
        data: level
    }
}

export const setComplexity = (complexity) => {
    return {
        type: types.SET_COMPLEXITY,
        data: complexity
    }
}

export const saveStorage = (key, data, callback) => {
    return (dispatch, getState) => {
        localStorage.setItem(key, JSON.stringify(data));
        callback('success')
    }
}