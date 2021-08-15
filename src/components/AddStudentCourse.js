import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import Spinner from './Spinner'
import {Container,Row,Form,FormGroup,FormControl,FormLabel,Button,Alert} from 'react-bootstrap';
import '../docs/css/login.css'

class AddStudentCourse extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             courseId : '',
             studentId : '',
             loader : false
        }
    }
    
    handleChange = (e)=>{
        const value = e.target.value;
        this.setState({
            [e.target.name] : value
        })
    }

    handleSubmit = () => {
        this.setState({
            loader : true
        });
        const role = localStorage.getItem('role')
        fetch('https://attendxyz.herokuapp.com/admin/assignCourse',{
            method : 'post',
            body : JSON.stringify({
                courseId : this.state.courseId,
                studentId : this.state.studentId
            }),
            headers : {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(res=>{
            
            console.log(res);
            if(res.status===200) {
              alert("registered successfully")
            }
            if(res.status===402) {
                alert("Details Already Exists!!")
              }
              if(res.status===401) {
                alert("Course Does not Exists!!")
              }
              if(res.status===403) {
                alert("Student ID doesnot Exists!!")
              }
            this.setState({
                loader : false
            })
            this.props.history.push('/admin/dashboard');
        }).catch(err => {
            this.setState({
                loader : false
            })
            console.log(err);
        })
    }

    render() {
        return (
           
            <div className="text-center mt-5">
                
                 {this.state.loader?<Spinner></Spinner>:null}
            <div className="form  col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10 m-auto my-auto">
                {/* col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10 */}
                <h1 className="m-3 mb-4">Assign Course to Student{/*localStorage.getItem('role')==='student'?"Student":('admin'?"admin":"teacher")*/}</h1>
                <div>
                <FormGroup className="form-inline ">
                    <FormLabel className="form-label">courseId</FormLabel>
                    <FormControl
                    type="text"
                    name="courseId"
                    placeholder="courseId"
                    onChange={this.handleChange}
                    value={this.state.courseId}
                    className="input1 col-xl-8 m-2"
                    />
                </FormGroup >
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">studentId</FormLabel>
                    <FormControl
                    type="text"
                    name="studentId"
                    value={this.state.studentId}
                    onChange={this.handleChange}
                    placeholder="studentId"
                    className="input col-xl-8 m-2"
                    />
                </FormGroup>
                <p id="login" className="warning"/>
                <Button className="m-2" onClick={() => this.handleSubmit()}>Add</Button>
                <Button className="m-2" onClick={ this.props.history.goBack}>
                    Cancel
                </Button>
                </div>

            </div>
                <div className="text-center m-2 mb-5">
                    <button className="btn btn-secondary mb-5" onClick={this.props.history.goBack}>Back</button>
                </div>
      </div>
        )
    }
}

export default withRouter(AddStudentCourse)
