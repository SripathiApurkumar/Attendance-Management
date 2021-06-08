import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {Carousel,Navbar,Nav,NavDropdown,OverlayTrigger,Popover} from 'react-bootstrap'
import {Container,Row,Form,FormGroup,FormControl,FormLabel,Alert} from 'react-bootstrap';
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import {withRouter,Prompt} from 'react-router-dom'
import '../docs/css/dashboard.css'

class StudentCoursePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user : JSON.parse(localStorage.getItem('user')),
            courseId : localStorage.getItem('courseId'),
            courseName : '',
            link : '',
            timings:'',
            teacherId:'',
            startTime:'',
            endTime : '',
            sunday : false,
        }
    }

    logout = ()=>{
        //console.log("logout called");
        localStorage.clear();
        this.props.history.push('/');
    } 
    viewAttend = ()=>{
        //console.log(this.props);
        this.props.history.push('/student/attendanceDetails')
    } 
    componentDidMount =()=>{
        fetch('https://attendxyz.herokuapp.com/student/getCourseById',{
            method : 'post',
            body : JSON.stringify({
                courseId : localStorage.getItem('courseId')
            }),
            headers : {
                'Content-type' : 'application/json',
                Authorization : localStorage.getItem('token')
            }
        }).then(res=>{
            return res.json()
        }).then(res =>{
            console.log(res);
            if(res.status == 200){
                this.setState({
                    courseName : res.result.courseName,
                    link : res.result.link,
                    timings:res.result.timings,
                    teacherId:res.result.teacherId,
                },()=>{
                    const startTime = parseInt(this.state.timings.split('-')[0]);
                    const endTime = parseInt(this.state.timings.split('-')[1]);
                    const sunday = new Date().getDay()==0;
                    this.setState({
                        startTime:startTime,
                        endTime : endTime,
                        sunday : sunday,
                    })
                })
            }
        }).catch(err=>{
            console.log(err);
        })
    }  
    submitAndJoin=()=>{
        const pdate = new Date();
        const atDate = new Date(pdate.getFullYear(),pdate.getMonth(),pdate.getDate());
        fetch('https://attendxyz.herokuapp.com/student/submitAttendance',{
            method : 'post',
            body : JSON.stringify({
                courseId : localStorage.getItem('courseId'),
                studentId : this.state.user.studentId,
                status : 1,
                attendanceDate : atDate,
                time : this.state.timings,
                day : new Date().getDay(),
            }),
            headers : {
                'Content-type' : 'application/json',
                Authorization : localStorage.getItem('token')
            }
        }).then(res=>{
            return res.json()
        }).then(res =>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
        const c1 = this.state.link[0]==='h'?this.state.link:`https://${this.state.link}`;
        const win = window.open(c1,'_blank');
        if(win!==null){
            win.focus()
        }else{
            alert('Something went wrong');
        }
    }
    render=()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        const popover = (
            <Popover id="popover-basic">
              <Popover.Title as="h3">{localStorage.getItem("role")==="student"?"Student":"Teacher"} Details</Popover.Title>
              <Popover.Content>
                <b className="h5">{user.studentId}</b> <br/>
                {user.name} <br/>
                <Button onClick={()=>this.props.history.push("/student/ViewProfile")} className="w-100 m-1">View Profile</Button>
                <Button onClick={()=>this.props.history.push("/student/updateProfile")} className="w-100 m-1">Edit Profile</Button>
                <Button onClick={()=>this.props.history.push("/student/updatePassword")} className="w-100 m-1"> Edit Password </Button>
              </Popover.Content>
            </Popover>
          );
        const pdate = new Date();
        return (
            <div>

                <div id="dh" className="home-header-section">
                
                    <Prompt message={(location,action)=>{
                        return location.pathname==='/login'?"Do you want to logout?":true;
                    }}></Prompt>
                    { 
                    
                    (localStorage.getItem('token'))?<span>
                        
                        <OverlayTrigger trigger="click" placement="bottom" className="float-right inline mt-1 mr-2 border border-1" overlay={popover}>
                            <Button variant="success" className="float-right inline mt-1 mr-2 border border-1"><i class="user icon"></i></Button>
                        </OverlayTrigger>

                        <button className="float-right mr-2 mt-1 inline btn btn-success border border-1 green" onClick={()=>this.logout()}>Logout</button>
                        <button className="small ui icon button float-right mr-2 btn-success notify mt-1 border border-1" width="20" height="20">
                            <i className="bell icon " ></i>
                        </button>
                        </span>:
                        <span>
                            <button className="float-right mr-2 mt-1 inline btn btn-success border border-1" onClick={()=>this.props.history.push('/register')}>Register</button>
                            <button className="float-right mr-2 mt-1 inline btn btn-success border border-1" onClick={()=>this.props.history.push('/login')}>Login</button>
                        </span>
                        }
                        <h1 className="inline set-headings">Attendance Management System</h1>
                        {/* <h3 id="head-of-a1" className="mt-1">Examination</h3> */}
                </div>
                <br/>
                <br/>
            
                <h1 style={{textAlign:'center'}}>{this.state.courseName}</h1>
                <div style={{textAlign:'center',padding:'100px'}}>{
                    this.state.sunday?<h3>Today is Holiday!</h3>:
                    pdate.getHours()>=this.state.endTime?
                        <h3>Attendance Time finished!</h3>:
                    pdate.getHours()<this.state.startTime?<h3>Attendance Time Not Started!</h3>:
                    <Button onClick={()=>this.submitAndJoin()}>
                        Join and Submit
                    </Button>
                }
                <Button onClick={()=>this.viewAttend()}>
                    View Attendance
                </Button>
            </div>
            <div className="text-center m-2">
                        <button className="btn btn-secondary" onClick={this.props.history.goBack}>Back</button>
                    </div>
        </div>
        )
    }

}
export default withRouter(StudentCoursePage)