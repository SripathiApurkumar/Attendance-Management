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

class TeacherProfile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            teacherId : '',
            name : '',
            mail:'',
            loader : false
        }
    }

    componentDidMount = ()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({
            teacherId : user.teacherId,
            name : user.name,
            mail:user.mail
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
                    <FormLabel className="form-label">Teacher Id</FormLabel>
                    <FormControl
                    type="text"
                    name="teacherId"
                    disabled = {true}
                    placeholder="teacherId"
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
                    disabled = {true}
                    value={this.state.name}
                    //onChange={this.handleChange}
                    placeholder="name"
                    className="input col-xl-8 m-2 border border-dark"
                    />
                </FormGroup>
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Email</FormLabel>
                    <FormControl
                    type="text"
                    name="mail"
                    disabled = {true}
                    value={this.state.mail}
                    //onChange={this.handleChange}
                    placeholder="Email Address"
                    className="input col-xl-8 m-2 border border-dark"
                    />
                </FormGroup>
                <p id="login" className="warning"/>
                {/* <Button className="m-1" onClick={()=>this.props.history.push('/teacher/updateProfile')}>Update Profile</Button> */ }
                <Button className="m-1" onClick={()=>this.props.history.push('/teacher/updateTeacherPassword')}>Update Password</Button>
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

export default withRouter(TeacherProfile)
