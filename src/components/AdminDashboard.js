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
            seconds : 200
        }
    }

    logout = ()=>{
        //console.log("logout called");
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        const popover = (
            <Popover id="popover-basic">
              <Popover.Title as="h3">{localStorage.getItem("role")==="student"?"Student":"Admin"} Details</Popover.Title>
              <Popover.Content>
                <b className="h5">{user.adminId}</b> <br/>
                {user.name} <br/>
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
                        </span>:
                        <span>
                            <button className="float-right mr-2 mt-1 inline btn btn-success border border-1" onClick={()=>this.props.history.push('/register')}>Register</button>
                            <button className="float-right mr-2 mt-1 inline btn btn-success border border-1" onClick={()=>this.props.history.push('/login')}>Login</button>
                        </span>
                        }
                        <h1 className="inline set-headings">Attendance Management System</h1>
                </div>
            <div id="dpic">
                <div id="dc">
                <br/>
                <br/>
                <button onClick={()=>{
                        this.props.history.push('/admin/addStudents')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">Add Students</button>
                <button onClick={()=>{
                        this.props.history.push('/admin/addTeachers')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">Add Teachers</button>
                <button onClick={()=>{
                        this.props.history.push('/admin/addCourses')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">Add Courses</button>
                <button onClick={()=>{
                        this.props.history.push('/admin/addStudentCourse')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">Assign Courses</button>
                <button onClick={()=>{
                        localStorage.setItem('role',"admin")
                        this.props.history.push('/admin/viewStudents')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">View Students</button>
                <button onClick={()=>{
                        this.props.history.push('/admin/viewTeachers')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">View Teachers</button>
                <button onClick={()=>{
                        this.props.history.push('/admin/viewCourses')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">View Courses</button>
                <button onClick={()=>{
                        this.props.history.push('/admin/viewStudentCourses')
                    }}  className="btn btn-primary col-md-4 m-4 border border-2">Student courses</button>
                </div>
            </div>
            </div>
        )
    }
}

export default withRouter(AdminDashboard)
