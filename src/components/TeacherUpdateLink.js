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

class TeacherUpdateLink extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            teacherId : '',
            name : '',
            link:'',
            courseId:'',
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
        console.log(JSON.stringify({
            teacherId : localStorage.getItem('userId'),
            courseId:localStorage.getItem('courseId'),
            link : this.state.link,
        }))
        fetch('https://attendxyz.herokuapp.com/teacher/updateLink',{
            method : 'post',
            headers : {
                'Content-Type': 'application/json',
                 //Authorization : localStorage.getItem('token')
            },
            body : JSON.stringify({
                teacherId : localStorage.getItem('userId'),
                courseId : localStorage.getItem('courseId'),
                link : this.state.link,
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
        })
    }

    render() {
        return (
            <div id="tfbb">
            <div id="tfb" className="text-center mt-5">
                
                 {this.state.loader?<Spinner></Spinner>:null}
            <div id="tform" className="form  col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10 m-auto my-auto">
                {/* col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10 */}
                <h1 className="m-3 mb-4">Update Class Link</h1>
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
                    disabled = {true}
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="name"
                    className="input col-xl-8 m-2 border border-dark"
                    />
                </FormGroup>
                <FormGroup className="form-inline">
                    <FormLabel className="form-label">Link</FormLabel>
                    <FormControl
                    type="text"
                    name="link"
                    value={this.state.link}
                    onChange={this.handleChange}
                    placeholder="Meet or Zoom Link"
                    className="input col-xl-8 m-2 border border-dark"
                    />
                </FormGroup>
                <p id="login" className="warning"/>
                <Button className="m-2" onClick={() => this.handleSubmit()}>Update Link</Button>
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

export default withRouter(TeacherUpdateLink)
