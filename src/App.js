// import logo from './logo.svg';
import './App.css';
import {HashRouter as Router,Route,Switch} from 'react-router-dom'
import {Offline, Online} from 'react-detect-offline'
import Home from './components/Home';
import {Component} from 'react'
//import Student from './components/Student';
import Login from './components/Login';
//import AdminLogin from './components/AdminLogin';
// import Register from './components/Register';
import AddStudent from './components/AddStudent';
// import TeacherRegister from './components/TeacherRegister';
import AdminDashboard from './components/AdminDashboard';
import Dashboard from './components/Dashboard';
import TeacherDashboard from './components/TeacherDashboard'
import './docs/css/header.css'
// import Course from './components/Course';
import UpdateStudent from './components/UpdateStudent';
import UpdateTeacher from './components/UpdateTeacher';
import UpdateTeacherPassword from './components/UpdateTeacherPassword';
import UpdatePassword from './components/UpdatePassword';
// import StudentCourse from './components/StudentCourse'
import ViewProfile from './components/ViewProfile';
import TeacherProfile from './components/TeacherProfile';
import AddStudentCourse from './components/AddStudentCourse';
import AddTeacher from './components/AddTeacher';
import AddTeacherCourse from './components/AddTeacherCourse';
import AdminViewStudents from './components/AdminViewStudents';
import AdminViewTeachers from './components/AdminViewTeachers';
import AdminViewCourses from './components/AdminViewCourses';
import StudentCoursePage from './components/StudentCoursePage';
import StudentAttendance from './components/StudentAttendance';
import TeacherAttendance from './components/TeacherAttendance';
import TeacherUpdateLink from './components/TeacherUpdateLink';
import AddAdmin from './components/AddAdmin';
import AdminViewStudentCourse from './components/AdminViewStudentCourse';
import ForgotPassword from './components/ForgotPassword';
import AdminPasswordUpdate from './components/AdminPasswordUpdate';


class App extends Component {
  render(){
    
      return (
        <div>
          <Online>
          <Router>
              <div>
                <Switch>
                  <Route exact path="/">
                    <Home></Home>
                  </Route>
                  <Route exact path="/login">
                    <Login/>
                  </Route>
                  <Route exact path="/student/StudentCoursePage">
                    <StudentCoursePage></StudentCoursePage>
                  </Route>
                  <Route exact path="/admin/viewStudents">
                    <AdminViewStudents/>
                  </Route>
                  <Route exact path="/admin/viewTeachers">
                    <AdminViewTeachers/>
                  </Route>
                  <Route exact path="/teacher/updateLink">
                    <TeacherUpdateLink/>
                  </Route>
                  <Route exact path="/admin/viewCourses">
                    <AdminViewCourses/>
                  </Route>
                  <Route exact path="/admin/viewStudentCourses">
                    <AdminViewStudentCourse/>
                  </Route>
                  <Route exact path="/admin/addAdmin">
                    <AddAdmin/>
                  </Route>
                  <Route exact path="/student/dashboard">
                    <Dashboard/>
                  </Route>
                  <Route exact path="/admin/dashboard">
                    <AdminDashboard/>
                  </Route>
                  <Route exact path="/admin/addStudents">
                    <AddStudent/>
                  </Route>
                  <Route exact path="/admin/addStudentCourse">
                    <AddStudentCourse/>
                  </Route>
                  <Route exact path="/admin/addTeachers">
                    <AddTeacher/>
                  </Route>
                  <Route exact path="/admin/addCourses">
                    <AddTeacherCourse/>
                  </Route>
                  <Route exact path="/admin/addStudentCourse">
                    <AddStudentCourse/>
                  </Route>
                  <Route exact path="/teacher/dashboard">
                    <TeacherDashboard/>
                  </Route>
                  <Route exact path="/teacher/teacherAttendance">
                    <TeacherAttendance/>
                  </Route>
                  <Route exact path="/teacher/ViewProfile">
                    <TeacherProfile/>
                  </Route>
                  <Route exact path="/teacher/updateProfile">
                    <UpdateTeacher/>
                  </Route>
                  <Route exact path="/teacher/updateTeacherPassword">
                    <UpdateTeacherPassword/>
                  </Route>
                  {/* <Route exact path="/teacher/course">
                    <Course/>
                  </Route> */}
                  {/* <Route exact path="/student/course">
                    <StudentCourse/>
                  </Route> */}
                  <Route exact path="/student/updateProfile">
                    <UpdateStudent/>
                  </Route>
                  <Route exact path="/student/ViewProfile">
                    <ViewProfile/>
                  </Route>
                  <Route exact path="/student/attendanceDetails">
                    <StudentAttendance/>
                  </Route>
                  <Route exact path="/student/updatePassword">
                    <UpdatePassword/>
                  </Route>
                  <Route exact path="/admin/updatePassword">
                    <AdminPasswordUpdate/>
                  </Route>
                  <Route exact path="/forgotPassword">
                    <ForgotPassword/>
                  </Route>
                </Switch>
              </div>
            </Router>
          </Online>
          <Offline>
            <div className="text-center">
              <h1>Connection Lost </h1>
              <h3>Please check yout Internet Connection</h3>
            </div>
          </Offline>
        </div>
            
      );
    }
}

export default App;
