import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import Spinner from './Spinner'
import {Container,Row,Form,FormGroup,FormControl,FormLabel,Button,Alert} from 'react-bootstrap';
import '../docs/css/login.css'

class AddTeacherCourse extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             courseId : '',
             courseName : '',
             teacherId : '',
             timings : '',
             link : '',
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
        fetch(`https://attendxyz.herokuapp.com/admin/addCourse`,{
            method : 'post',
            body : JSON.stringify({
                courseId : this.state.courseId,
                courseName : this.state.courseName,
                teacherId : this.state.teacherId,
                timings : this.state.timings,
                link : this.state.link
            }),
            headers : {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(res=>{
            
            console.log(res);
            if(res.status===200) {
              alert("registered successfully");
              this.props.history.push('/admin/dashboard');
            }
            if(res.status===401) {
                alert("Course ID doesnot Exists!!");
                this.props.history.push('/admin/dashboard');
              }
              if(res.status===400) {
                alert("Teacher ID doesnot exists!!");
                this.props.history.push('/admin/dashboard');
              }
            this.setState({
                loader : false
            })
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
                <h1 className="m-3 mb-4">Add Course{/*localStorage.getItem('role')==='student'?"Student":('admin'?"admin":"teacher")*/}</h1>
                <div>
                <FormGroup className="form-inline ">
                    <FormLabel className="form-label">Course Id</FormLabel>
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
                    <FormLabel className="form-label">Course Name</FormLabel>
                    <FormControl
                    type="text"
                    name="courseName"
                    value={this.state.courseName}
                    onChange={this.handleChange}
                    placeholder="courseName"
                    className="input col-xl-8 m-2"
                    />
                </FormGroup>
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Teacher Id</FormLabel>
                    <FormControl
                    type="text"
                    name="teacherId"
                    value={this.state.teacherId}
                    onChange={this.handleChange}
                    placeholder="teacherId"
                    className="input col-xl-8 m-2"
                    />
                </FormGroup>
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Timings</FormLabel>
                    <FormControl
                    type="text"
                    name="timings"
                    value={this.state.timings}
                    onChange={this.handleChange}
                    placeholder="timings"
                    className="input col-xl-8 m-2"
                    />
                </FormGroup>
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Link</FormLabel>
                    <FormControl
                    type="text"
                    name="link"
                    value={this.state.link}
                    onChange={this.handleChange}
                    placeholder="link"
                    className="input col-xl-8 m-2"
                    />
                </FormGroup>
                <p id="login" className="warning"/>
                <Button className="m-2" onClick={() => this.handleSubmit()}>Add</Button>
                <Button className="m-2" onClick={this.props.history.goBack}>
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

export default withRouter(AddTeacherCourse)
