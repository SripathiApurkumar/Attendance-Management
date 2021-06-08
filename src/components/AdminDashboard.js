// import { json } from 'express'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {Carousel,Navbar,Nav,NavDropdown,OverlayTrigger,Popover} from 'react-bootstrap'
import {Container,Row,Form,FormGroup,FormControl,FormLabel,Alert} from 'react-bootstrap';
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import {withRouter,Prompt} from 'react-router-dom'
import '../docs/css/dashboard.css'

export class AdminDashboard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            user : JSON.parse(localStorage.getItem('user')),
            //courses : [],
            //time : {},
            seconds : 200
        }
        //this.timer = 0;
        //this.countDown = this.countDown.bind(this);
    }

    logout = ()=>{
        //console.log("logout called");
        localStorage.clear();
        this.props.history.push('/');
    }

    // componentDidMount(){
    //     console.log(localStorage.getItem('user'))
    //     fetch({
    //         method : 'post',
    //         body : JSON.stringify({
    //             adminId : this.state.user.adminId
    //         }),
    //         headers : {
    //             'Content-type' : 'application/json',
    //             Authorization : localStorage.getItem('token')
    //         }
    //     }).then(res => {
    //         return res.json();
    //     }).then(res => {
    //         console.log(res)
    //         // if(res.status == 200){
    //         //     this.setState({
    //         //         courses : res.results
    //         //     })
    //         // }
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        const popover = (
            <Popover id="popover-basic">
              <Popover.Title as="h3">{localStorage.getItem("role")==="student"?"Student":"Admin"} Details</Popover.Title>
              <Popover.Content>
                <b className="h5">{user.adminId}</b> <br/>
                {user.name} <br/>
                {/*<Button onClick={()=>this.props.history.push("/student/ViewProfile")} className="w-100 m-1">View Profile</Button>
                {/*<Button onClick={()=>this.props.history.push("/student/updateProfile")} className="w-100 m-1">Edit Profile</Button>*/}
                <Button onClick={()=>this.props.history.push("/admin/updatePassword")} className="w-100 m-1"> Edit Password </Button>
                <Button onClick={()=>this.props.history.push("/admin/addAdmin")} className="w-100 m-1"> Add Admin </Button>
              </Popover.Content>
            </Popover>
          );
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
                        {/* <button className="small ui icon button float-right mr-2 btn-success notify mt-1 border border-1" width="20" height="20">
                            <i className="bell icon " ></i>
                        </button> */}
                        </span>:
                        <span>
                            <button className="float-right mr-2 mt-1 inline btn btn-success border border-1" onClick={()=>this.props.history.push('/register')}>Register</button>
                            <button className="float-right mr-2 mt-1 inline btn btn-success border border-1" onClick={()=>this.props.history.push('/login')}>Login</button>
                        </span>
                        }
                        <h1 className="inline set-headings">Attendance Management System</h1>
                        {/* <h3 id="head-of-a1" className="mt-1">Examination</h3> */}
                </div>
            <div id="dpic">
                <div id="dc">
                <br/>
                <br/>
                <button onClick={()=>{
                        {/*localStorage.setItem('role',"student")*/}
                        this.props.history.push('/admin/addStudents')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">Add Students</button>
                <button onClick={()=>{
                        {/*localStorage.setItem('role',"teacher")*/}
                        this.props.history.push('/admin/addTeachers')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">Add Teachers</button>
                <button onClick={()=>{
                        {/*localStorage.setItem('role',"admin")*/}
                        this.props.history.push('/admin/addCourses')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">Add Courses</button>
                <button onClick={()=>{
                        {/*localStorage.setItem('role',"admin")*/}
                        this.props.history.push('/admin/addStudentCourse')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">Assign Courses</button>
                <button onClick={()=>{
                        localStorage.setItem('role',"admin")
                        this.props.history.push('/admin/viewStudents')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">View Students</button>
                <button onClick={()=>{
                        {/*localStorage.setItem('role',"admin")*/}
                        this.props.history.push('/admin/viewTeachers')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">View Teachers</button>
                <button onClick={()=>{
                        {/*localStorage.setItem('role',"admin")*/}
                        this.props.history.push('/admin/viewCourses')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">View Courses</button>
                <button onClick={()=>{
                        {/*localStorage.setItem('role',"admin")*/}
                        this.props.history.push('/admin/viewStudentCourses')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">Student courses</button>
                </div>
                { /* <Button className="m-1" onClick={()=>this.props.history.push('/student/ViewProfile')}>View Profile</Button> */}
            </div>
            </div>
        )
    }
}

export default withRouter(AdminDashboard)
