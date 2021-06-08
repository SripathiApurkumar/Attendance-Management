import React, { Component, useReducer } from 'react'
import {withRouter} from 'react-router-dom'
import {Carousel,Navbar,Nav,NavDropdown,OverlayTrigger,Popover} from 'react-bootstrap'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button } from 'react-bootstrap';
import Spinner from './Spinner'
import '../docs/css/review.css'
class StudentAttendance extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            courseId : '',
            attendanceDate : '',
            time : '',
            status : '',
            loader : true,
            students : [],
            tempStudents : [],
            searchBy:'studentId',
            searchText: ''
        }
    }

    logout = ()=>{
        //console.log("logout called");
        localStorage.clear();
        this.props.history.push('/');
    }

    fetchAttendance = () =>{
        fetch('https://attendxyz.herokuapp.com/student/getAttendanceDetails',{
            method : 'post',
            headers : {
                'Content-type' : 'application/json',
                //Authorization : localStorage.getItem('token')
            },
            body : JSON.stringify({
                courseId : localStorage.getItem('courseId'),
                studentId : localStorage.getItem('userId')
            }),
        }).then(res=>{
            return res.json();
        }).then(res=>{
            console.log(res);
            if(res.status===200){
                this.setState({
                    tempStudents:res.results,
                    students : res.results,
                    loader : false
                },()=>{
                    console.log('Results')
                    console.log(this.state.students);
                });
            }
            else if(res.status===402){
                alert("Session expired, Please Login again");
                this.logout();
            }
            else{
                alert('Errorr');
                alert(res.msg);
                this.setState({
                    students : [],
                    loader : false
                });
            }
        }).catch(err=>{
            console.log(err);
            this.setState({
                students : [],
                loader : false
            });
        })
    }
    
    componentDidMount = ()=>{
        this.fetchAttendance();
    }

    handleChange = evt => {
        this.setState ({
          [evt.target.name]: evt.target.value,
        },()=>{
          var text=document.getElementById('searchText').value;
          this.setState({
            ...this.state,
            tempStudents:this.filterSearch(text)
          })
        })
      };
    filterSearch = (text)=>
    {
      return this.state.students.filter((student,index)=>{
          console.log(this.state.searchBy)
        return student[this.state.searchBy].toLowerCase().includes(text);
      })
    }
    handleSearch = (event)=>
    {
      // console.log(event.target.value);
      var text=event.target.value.toLowerCase().trim();
      this.setState({
        ...this.state,
        tempStudents:this.filterSearch(text)
      })
    }


    render() {
        // var date = new Date(this.state.dateTime);
        // var dt = date.toString().split("G")[0];
        return (
            <div className="m-2">
                {this.state.loader===true?
                <Spinner></Spinner>:
                <div>
                    <h1 style={{color:'white',textAlign:'center',backgroundColor:'rgb(21, 241, 241)',padding:'20px'}} className="inline set-headings">Attendance Management System</h1>
                    <br/>
                    <h1 id="vsh1" className="m-1 text-center">{/*this.state.testName*/}Attendance Details</h1>
                    <br/>
                    <br/>

                    <div className="searchdiv">
          
                        <select className="drop" name="searchBy" onChange={(event)=>{
                                console.log('hi!')
                                this.handleChange(event)
                            }}>
                        {/* <option value="studentId">studentId</option> */}
                        {/* <option value="year">Year</option> */}
                        <option value="attendanceDate">Date</option>
                        </select>
                        <div>
                        <input className="search" name="searchText" id="searchText" 
                            placeholder="search By selected field"
                            onChange={(event)=>{
                                console.log('clicked')
                                this.handleSearch(event)
                                }}></input>
                        {/* <button style={{backgroundColor:"white",height:"30px",borderStyle:"none",padding:"0px",width:"150px"}}>Search</button> */}
                        </div>
                    </div>

                    <br/>
                    <div>
                        
                        {/* this.state.students.length===0?<h2>No students Yet</h2>: */}
                        <Table  striped bordered hover size="sm" id="users" className="w-90 m-auto table table-striped table-bordered dt-responsive nowrap">
                            {/* <Thead>
                                <Tr>
                                    <Th>Course Id</Th>
                                    <Th>Date</Th>
                                    <Th>Time</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead> */}
                            <Tbody>
                            <Tr>
                                    <Td><b>Course Id</b></Td>
                                    <Td><b>Date</b></Td>
                                    <Td><b>Time</b></Td>
                                    <Td><b>Status</b></Td>
                                </Tr>
                                {
                                    this.state.tempStudents.map((student,index)=>{
                                        return (
                                            <Tr key={index}>
                                                <Td>{student.courseId}</Td>
                                                <Td>{student.attendanceDate.split('T')[0]}</Td>
                                                <Td>{student.time}</Td>
                                                <Td>{student.status===1?'Present':'Absent'}</Td>
                                            </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                        
                        
                    </div>
                </div>
                }
                <div className="text-center m-2">
                        <button className="btn btn-secondary" onClick={this.props.history.goBack}>Back</button>
                    </div>
            </div>
            
        )
    }
}

export default withRouter(StudentAttendance)
