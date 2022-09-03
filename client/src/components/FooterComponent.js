import React,{Component} from 'react';

class Footer extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

render(){
    return(
        <div className='mb-5'>
            <p className="footer" align="center">Library Management System Project</p>
            <p className="footer" align="center">@mutabay</p>
        </div>
          );
}

}

export default Footer;