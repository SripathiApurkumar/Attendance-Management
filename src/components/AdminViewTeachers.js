import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button } from 'react-bootstrap';
import Spinner from './Spinner'
import '../docs/css/review.css'
class AdminViewTeachers extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            teacherId : '',
            name : '',
            mail:'',
            loader : true,
            teachers : []
        }
    }

    logout = ()=>{
        //console.log("logout called");
        localStorage.clear();
        this.props.history.push('/');
    }

    fetchAllTeachers =()=>{
        fetch('https://attendxyz.herokuapp.com/admin/getTeachers',{
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
                    teachers : res.results,
                    loader : false
                },()=>{
                    console.log('Results')
                    console.log(this.state.teachers);
                });
            }
            else if(res.status===402){
                alert("Session expired, Please Login again");
                this.logout();
            }
            else{
                this.setState({
                    teachers : [],
                    loader : false
                });
            }
        }).catch(err=>{
            console.log(err);
            this.setState({
                teachers : [],
                loader : false
            });
        })
    }
    
    componentDidMount = ()=>{
        this.fetchAllTeachers();
    }

    deleteTeacher=(teacherId)=>{
        if(teacherId!=='' && teacherId!== null){
            this.setState({loader:true})
            fetch(`https://attendxyz.herokuapp.com/admin/deleteTeacher/${teacherId}`,{
                method : 'delete',
                headers : {
                    'Content-type' : 'application/json',
                    //Authorization : localStorage.getItem('token')
                }
            }).then(res=>{
                return res.json();
            }).then(res=>{
                console.log(res);
                if(res.status==200){
                    alert("Teacher Successfully Deleted");
                    this.fetchAllTeachers();
                }
                else{
                    alert("Something went wrong");
                    this.setState({loader:false})
                }
            }).catch(err=>{
                console.log(err);
                this.setState({
                    //students : [],
                    loader : false
                });
            })
        }
    }

    render() {
        return (
            <div className="m-2">
                {this.state.loader===true?
                <Spinner></Spinner>:
                <div>
                    <h1 style={{color:'white',textAlign:'center',backgroundColor:'rgb(21, 241, 241)',padding:'20px'}} className="inline set-headings">Attendance Management System</h1>
                    <br/>
                    <br/>
                    <h1 id="vsh1" className="m-1 text-center">Total Teachers</h1>
                    <br/>
                    
                    <div>
                        {
                         this.state.teachers.length===0?<h2>No teachers Yet</h2>:
                        <Table  striped bordered hover size="sm" id="users" className="w-50 m-auto table table-striped table-bordered dt-responsive nowrap">
                            {/* <Thead>
                                <Tr>
                                    <Th>Teacher Id</Th>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead> */}
                            <Tbody>
                            <Tr>
                                    <Td><b>Teacher Id</b></Td>
                                    <Td><b>Name</b></Td>
                                    <Td><b>Email</b></Td>
                                    <Td><b>Actions</b></Td>
                                </Tr>
                                {
                                    this.state.teachers.map((teacher,index)=>{
                                        return (
                                            <Tr key={index}>
                                                <Td>{teacher.teacherId}</Td>
                                                <Td>{teacher.name}</Td>
                                                <Td>{teacher.mail}</Td>
                                                <Td>
                                                    <i class="ui icon trash large red" onClick={()=>{
                                                        if(window.confirm('Course associated to teacher also will delete! Are you sure?')){
                                                            this.deleteTeacher(teacher.teacherId)
                                                        }

                                                    }} > </i>
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                        
                        }
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

export default withRouter(AdminViewTeachers)
