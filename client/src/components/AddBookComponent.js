import React,{Component} from 'react';
import {Button, Label, Col, Row} from 'reactstrap';
import { Control, LocalForm, Errors  } from 'react-redux-form';
import Loading from './LoadingComponent';

const required = (val) => val && val.length;
const requiredNum = (val) => !!(val);
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxVal = (len) => (val) => !(val) || (val<= len);
const minVal = (len) => (val) => (val) && (val>= len);
const isNumber = (val) => !isNaN(Number(val));

const today = new Date();
const current_year = today.getFullYear();

const languages = ['Turkish', 'English', 'German', 'Italian', 'French', 'Arabic', 'Persian', 'Greek', 'Spanish','Polish', 'Other', 'Unknown'];


class AddBook extends Component {

    constructor(props){
        super(props);
        this.state={
        }

    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
      }

render(){
    let uniqueIsbn=(val) =>(!this.props.books.some((book)=>(book.isbn===val)))
    let uniqueName=(val) =>(!this.props.books.some((book)=>(book.name===val)))

    const languageItems = languages.map((language) =>
                            <option>{language}</option> 
                            );
    

    if (this.props.booksLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.booksErrMess) {
        return(
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12">
                        <br/><br/><br/><br/>
                        <h3>{this.props.booksErrMess}</h3>
                    </div>
                </div>
            </div>
        );
    }
    else
 return (
    <div className="container">
    <div className="row justify-content-center heading">
    <div className="col-12">
  <h3 align="center">  Add a book</h3>
  </div>
    </div>
    <div className="row row-content justify-content-center">
    <LocalForm onSubmit={(values) => {
        this.props.postBook( values.name, values.author, values.description, values.isbn, values.cat, values.shelf, 
            values.floor, values.copies, values.publishYear, values.editor, values.publisher, values.edition, 
            values.pageCount, values.language);
    }}>
                    <Row className="form-group required">
                                <Label className='control-label' htmlFor="name" md={2}>Name </Label>
                                <Col md={4}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name of book"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3),uniqueName
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: ' Must be greater than 2 characters',
                                            uniqueName: ' There exists a book with this name already'
                                        }}
                                     />
                                </Col>
                                <Label className='control-label' htmlFor="author" md={2}>Authors </Label>
                                <Col md={4}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Name of authors"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: ' Must be greater than 2 characters'
                                        }}
                                     />
                                </Col>
                    </Row>
                    <Row className="form-group required">
                        <Label className='control-label' htmlFor="isbn" md={2}>ISBN No.</Label>
                        <Col md={4}>
                            <Control.text model=".isbn" id="isbn" name="isbn"
                                placeholder="ISBN no. of book"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(10), maxLength: maxLength(13), isNumber,
                                    uniqueIsbn
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".isbn"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: ' Must be greater than 9 numbers',
                                    maxLength: ' Must be 13 numbers or less',
                                    isNumber: ' Must be a number',
                                    uniqueIsbn: ' There exists a book with this ISBN No.'
                                }}
                                />
                        </Col>
                        <Label className='control-label' htmlFor="copies" md={3}> Copies Available</Label>
                        <Col md={3}>
                            <Control.text model=".copies" id="copies" name="copies"
                                placeholder="Number of copies available"
                                className="form-control"
                                validators={{
                                    requiredNum, minVal: minVal(1), maxVal: maxVal(1000), isNumber
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".copies"
                                show="touched"
                                messages={{
                                    requiredNum: 'Required',
                                    minVal: ' Must be greater than 0',
                                    maxVal: ' Must be 1000 or less',
                                    isNumber: ' Must be a number'
                                }}
                                />
                        </Col>
                    </Row>

                    <Row className="form-group required">
                        <Label htmlFor="publishYear" md={2}>Publish Year</Label>
                        <Col md={4}>
                            <Control.text model=".publishYear" id="publishYear" name="publishYear"
                                placeholder="Publication year of the book"
                                className="form-control"
                                validators={{
                                    maxVal: maxVal(current_year + 1), isNumber,
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".publishYear"
                                show="touched"
                                messages={{
                                    maxVal: ' Must be less than or equal to the current year',
                                    isNumber: ' Must be a number',
                                }}
                                />
                        </Col>
                        <Label className='control-label' htmlFor="editor" md={2}>Editor </Label>
                        <Col md={4}>
                            <Control.text model=".editor" id="editor" name="editor"
                                placeholder="Name of editor"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(2)
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".editor"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: ' Must be greater than 1 character'
                                }}
                                />
                        </Col>
                    </Row>
                    
                    <Row className="form-group">
                        <Label htmlFor="edition" md={2}>Edition</Label>
                        <Col md={4}>
                            <Control.text model=".edition" id="edition" name="edition"
                                placeholder="Edition of book"
                                className="form-control"
                                validators={{
                                    minVal: minVal(1), maxVal: maxVal(1000), isNumber,
                                    uniqueIsbn
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".edition"
                                show="touched"
                                messages={{
                                    minVal: ' Must be greater than 0',
                                    maxVal: ' Must be 1000 or less',
                                    isNumber: ' Must be a number'
                                }}
                                />
                        </Col>

                        <Label htmlFor="pageCount" md={2}>Page Count</Label>
                        <Col md={4}>
                            <Control.text model=".pageCount" id="pageCount" name="pageCount"
                                placeholder="Number of pages in the book"
                                className="form-control"
                                validators={{
                                    minVal: minVal(1), isNumber
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".pageCount"
                                show="touched"
                                messages={{
                                    minVal: ' Must be greater than 0',
                                    isNumber: ' Must be a number'
                                }}
                                />
                        </Col>
                    </Row>
                    
                    <Row className="form-group align-self-center">
                        <Label htmlFor="publisher" md={2}>Publisher </Label>
                        <Col className='align-center' md={10} >
                            <Control.text model=".publisher" id="publisher" name="publisher"
                                placeholder="Name of publisher"
                                className="form-control"
                                validators={{
                                    minLength: minLength(2)
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".publisher"
                                show="touched"
                                messages={{
                                    minLength: ' Must be greater than 1 character'
                                }}
                                />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="cat">Category</Label>
                        <Control.select defaultValue="Romance" model=".cat" id="cat" className="form-control">
                            <option>Romance</option> <option>Technology</option>
                            <option>Computer Science</option> <option>Management</option>
                            <option>Electronics</option> <option>Physics</option>
                            <option>Chemistry</option> <option>Mathematics</option>
                            <option>Fiction</option> <option>Philosophy</option>
                            <option>Language</option> <option>Arts</option>
                            <option>Other</option> 

                        </Control.select>
                        </Col>
                        <Col>
                        <Label htmlFor="language">Language </Label>
                        <Control.select defaultValue={0} model=".language" id="language" 
                        className="form-control" >
                            {languageItems}
                        </Control.select>
                        </Col>
                    </Row>

                    
                    
                    <Row className="form-group required">
                            <Col>
                            <Label className='control-label' htmlFor="floor">Floor </Label>
                                <Control.select defaultValue={0} model=".floor" id="floor" 
                                className="form-control" >
                                    <option>0</option> <option>1</option>
                                    <option>2</option> <option>3</option>
                                    <option>4</option> <option>5</option>
                                    <option>6</option> <option>7</option>
                                    <option>8</option> 
                                </Control.select>
                            </Col>
                            <Col>
                            <Label className='control-label' htmlFor="shelf" > Shelf</Label>
                                <Control.text model=".shelf" id="shelf" name="shelf"
                                    placeholder="Shelf no. for locating book"
                                    className="form-control"
                                    validators={{
                                        requiredNum, minVal: minVal(1), maxVal: maxVal(100), isNumber
                                    }}
                                        />
                                <Errors
                                    className="text-danger"
                                    model=".shelf"
                                    show="touched"
                                    messages={{
                                        requiredNum: 'Required',
                                        minVal: ' Must be greater than 0',
                                        maxVal: ' Must be 100 or less',
                                        isNumber: ' Must be a number'
                                    }}
                                    />
                            </Col>
                        </Row>

                    
                    <Row className="form-group">
                            <Label htmlFor="description" md={2}>Description</Label>
                            <Col md={10}>
                                <Control.textarea model=".description" id="description" name="description"
                                    rows="12"
                                    placeholder="Some description of the book"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Row className="align-self-center">
                        <Col className="text-center">
                    <Button type="submit" className="bg-primary">
                        Submit
                    </Button>
                    </Col>
                    </Row>
                </LocalForm>
                </div>
            <br/>
    </div>
 );

}

}

export default AddBook;