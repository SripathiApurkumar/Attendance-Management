import React, { Component } from 'react'
import {withRouter,Prompt} from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button,OverlayTrigger,Popover } from 'react-bootstrap';
import Spinner from './Spinner'
import '../docs/css/review.css'
//import '../docs/css/dashboard.css'
class AdminViewCourses extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            courseId : '',
            courseName : '',
            teacherId : '',
            timings : '',
            link : '',
            loader : true,
            submissions : [],
            tempStudents : [],
            searchBy:'courseId',
            searchText: ''
        }
    }

    logout = ()=>{
        //console.log("logout called");
        localStorage.clear();
        this.props.history.push('/');
    }
    
    componentDidMount = ()=>{
        fetch('https://attendxyz.herokuapp.com/admin/getCourses',{
            method : 'get',
            headers : {
                'Content-type' : 'application/json',
                //Authorization : localStorage.getItem('token')
            }
            //  body : JSON.stringify({
            //      adminId : localStorage.getItem('adminId'),
            //  })
        }).then(res=>{
            return res.json();
        }).then(res=>{
            console.log(res);
            if(res.status===200){
                this.setState({
                    tempStudents:res.results,
                    submissions : res.results,
                    loader : false
                },()=>{
                    console.log('Results')
                    console.log(this.state.submissions);
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
                    submissions : [],
                    loader : false
                });
            }
        }).catch(err=>{
            console.log(err);
            this.setState({
                submissions : [],
                loader : false
            });
        })
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
      return this.state.submissions.filter((student,index)=>{
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


                <div >
                    <h1 style={{color:'white',textAlign:'center',backgroundColor:'rgb(21, 241, 241)',padding:'20px'}} className="inline set-headings">Attendance Management System</h1>
                    <br/>
                    <h3 id="vsh1" className="m-1 text-center">Courses Assigned to Teachers </h3>
                    <br/>
                    <br/>

                    <div className="searchdiv">
          
                        <select className="drop" name="searchBy" onChange={(event)=>{
                                console.log('hi!')
                                this.handleChange(event)
                            }}>
                        <option value="courseId">Course Id</option>
                        <option value="teacherId">Teacher Id</option>
                        <option value="courseName">Course Name</option>
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

                        <Table  striped bordered hover size="sm" id="users" className="w-80 m-auto table table-striped table-bordered dt-responsive nowrap">
                            {/* <Thead>
                                <Tr>
                                    <Th>Course Id</Th>
                                    <Th>Course Name</Th>
                                    <Th>Teacher Id</Th>
                                    <Th>Timings</Th>
                                    <Th>Meet link</Th>
                                </Tr>
                            </Thead> */}
                            <Tbody>
                            <Tr>
                                    <Td><b>Course Id</b></Td>
                                    <Td><b>Course Name</b></Td>
                                    <Td><b>Teacher Id</b></Td>
                                    <Td><b>Timings</b></Td>
                                    <Td><b>Meet link</b></Td>
                                </Tr>
                                {
                                    this.state.submissions.length===0?<h2>No submissions Yet</h2>:
                                    this.state.tempStudents.map((submission,index)=>{
                                        return (
                                            <Tr key={index}>
                                                <Td>{submission.courseId}</Td>
                                                <Td>{submission.courseName}</Td>
                                                <Td>{submission.teacherId}</Td>
                                                <Td>{submission.timings}</Td>
                                                <Td>{submission.link}</Td>
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

export default withRouter(AdminViewCourses)
