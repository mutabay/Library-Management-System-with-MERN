import React,{Component} from 'react';

class Home extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
      }

render(){
    return(
        <div className="container mt-4 home text-center align-self-center ">
        <br/><br/><br/>
            <div className="m-3 text-center justify-content-center">
            <h1 align="center"> Welcome to the Library Management System</h1>
            <h3> Login for processing</h3>
            </div>
        </div>
        );
}

}

export default Home;