import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import '../docs/css/home.css'


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            name:''
        }
        
    }  

    componentDidMount = ()=>{
        console.log("hom4");
        localStorage.clear();
    }
   
    render()
    {
        return (
            <div id="home" className="text-center">
                <h1 id="headi" className="m-3">Onilne Attendance Management System</h1>
                <br/>
                <br/>
                <button onClick={()=>{
                        localStorage.setItem('role',"student")
                        this.props.history.push('/login')
                    }}  className="btn col-md-4 m-3 border border-2">Log in as Student</button>
                <button onClick={()=>{
                        localStorage.setItem('role',"teacher")
                        this.props.history.push('/login')
                    }}  className="btn col-md-4 m-3 border border-2">Log in as Teacher</button>
                <button onClick={()=>{
                        localStorage.setItem('role',"admin")
                        this.props.history.push('/login')
                    }}  className="btn btn-primary col-md-4 m-3 border border-2">Log in as Admin</button>
            </div>
        )
    }
}
export default withRouter(Home);