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

class UpdateTeacher extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            teacherId : '',
            name : '',
            mail : '',
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
        fetch(`https://attendxyz.herokuapp.com/teacher/teacherUpdate`,{
            method : 'post',
            headers : {
                'Content-Type': 'application/json',
                //  Authorization : localStorage.getItem('token')
            },
            body : JSON.stringify({
                teacherId : this.state.teacherId,
                name : this.state.name,
                mail : this.state.mail
            })
        }).then(res => {
            console.log(res)
            return res.json();
        }).then(res=>{
            
            console.log(res);
            if(res.status===200) {
              alert("Updated successfully")
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
                <h1 className="m-3 mb-4">{localStorage.getItem('role')==='student'?"Student":"Faculty"} Update</h1>
                <div>
                <FormGroup className="form-inline ">
                    <FormLabel className="form-label">Teacher Id</FormLabel>
                    <FormControl
                    type="text"
                    name="teacherId"
                    disabled = {true}
                    placeholder="teacherId"
                    onChange={this.handleChange}
                    value={this.state.teacherId}
                    className="input1 col-xl-8 m-2 border border-dark"
                    />
                </FormGroup >
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Name</FormLabel>
                    <FormControl
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="name"
                    className="input col-xl-8 m-2 border border-dark"
                    />
                </FormGroup>
                <FormGroup className="form-inline ">
                    <FormLabel className="form-label">Email</FormLabel>
                    <FormControl
                    type="text"
                    name="mail"
                    placeholder="Email Address"
                    onChange={this.handleChange}
                    value={this.state.mail}
                    className="input1 col-xl-8 m-2 border border-dark"
                    />
                </FormGroup >
                <p id="login" className="warning"/>
                <Button className="m-2" onClick={() => this.handleSubmit()}>Update</Button>
                <Button className="m-2" onClick={this.props.history.goBack}>Cancel</Button>
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

export default withRouter(UpdateTeacher)
