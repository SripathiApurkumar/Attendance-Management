import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import Spinner from './Spinner'
import {
    Container,
    Row,
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Button,
    Alert
  } from 'react-bootstrap';
import '../docs/css/viewProfile.css'

class ViewProfile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            studentId : '',
            name : '',
            year : '' ,
            mail : '',
            class : '' ,
            loader : false
        }
    }

    componentDidMount = ()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({
            studentId : user.studentId,
            name : user.name,
            year : user.year ,
            class : user.class,
            mail : user.mail 
        })
    }

    render() {
        return (
            <div id="tfbb">
            <div id="tfb" className="text-center mt-5">
                
                 {this.state.loader?<Spinner></Spinner>:null}
            <div id="tform" className="form  col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10 m-auto my-auto">
                {/* col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10 */}
                <h1 className="m-3 mb-4">{localStorage.getItem('role')==='student'?"Student":"Faculty"} Profile</h1>
                <div>
                <FormGroup className="form-inline ">
                    <FormLabel className="form-label">Student Id</FormLabel>
                    <FormControl
                    type="text"
                    name="studentId"
                    disabled = {true}
                    placeholder="studentId"
                    // onChange={this.handleChange}
                    value={this.state.studentId}
                    className="input1 col-xl-8 m-2 border border-dark"
                    />
                </FormGroup >
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Name</FormLabel>
                    <FormControl
                    type="text"
                    name="name"
                    disabled={true}
                    value={this.state.name}
                   // onChange={this.handleChange}
                    placeholder="name"
                    className="input col-xl-8 m-2 border border-dark"
                    />
                </FormGroup>
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Year</FormLabel>
                    <FormControl
                    type="text"
                    name="year"
                    disabled={true}
                    value={this.state.year}
                    //onChange={this.handleChange}
                    placeholder="year"
                    className="input col-xl-8 m-2 border border-dark"
                    />
                </FormGroup>
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Class</FormLabel>
                    <FormControl
                    type="text"
                    name="class"
                    disabled={true}
                    value={this.state.class}
                   // onChange={this.handleChange}
                    placeholder="class"
                    className="input col-xl-8 m-2 border border-dark"
                    />
                </FormGroup>
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Email</FormLabel>
                    <FormControl
                    type="text"
                    name="mail"
                    disabled={true}
                    value={this.state.mail}
                   // onChange={this.handleChange}
                    placeholder="Email Address"
                    className="input col-xl-8 m-2 border border-dark"
                    />
                </FormGroup>
                <p id="login" className="warning"/>
                {/* <Button className="m-2" onClick={() => this.handleSubmit()}>Update</Button> */}
                {/* <Button className="m-1" onClick={()=>this.props.history.push('/student/updateProfile')}>Update Profile</Button>*/}
                <Button className="m-1" onClick={()=>this.props.history.push('/student/updatePassword')}>Update Password</Button>
                </div>

            </div>
                <div className="text-center m-2 mb-5">
                    <button className="btn btn-secondary mb-5" onClick={this.props.history.goBack}>Back</button>
                </div>
      </div>
      </div>
        )
    }
}

export default withRouter(ViewProfile)
