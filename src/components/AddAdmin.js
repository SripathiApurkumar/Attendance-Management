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
import '../docs/css/login.css'

class AddAdmin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             adminId : '',
             name : '',
             password : '',
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
        fetch(`https://attendxyz.herokuapp.com/admin/addAdmin`,{
            method : 'post',
            body : JSON.stringify({
                adminId : this.state.adminId,
                name : this.state.name,
                password : this.state.password,
                mail : this.state.mail
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
                <h1 className="m-3 mb-4">Add {localStorage.getItem('role')==='student'?"Student":"Teacher"}</h1>
                <div>
                <FormGroup className="form-inline ">
                    <FormLabel className="form-label">Admin Id</FormLabel>
                    <FormControl
                    type="text"
                    name="adminId"
                    placeholder="Admin Id"
                    onChange={this.handleChange}
                    value={this.state.adminId}
                    className="input1 col-xl-8 m-2"
                    />
                </FormGroup >
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">name</FormLabel>
                    <FormControl
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Name"
                    className="input col-xl-8 m-2"
                    />
                </FormGroup>
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Email</FormLabel>
                    <FormControl
                    type="text"
                    name="mail"
                    value={this.state.mail}
                    onChange={this.handleChange}
                    placeholder="Email Address"
                    className="input col-xl-8 m-2"
                    />
                </FormGroup>
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Password</FormLabel>
                    <FormControl
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                    className="input col-xl-8 m-2"
                    />
                </FormGroup>
                <p id="login" className="warning"/>
                <Button className="m-2" onClick={() => this.handleSubmit()}>Add Admin</Button>
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

export default withRouter(AddAdmin)
