import React, { Component } from "react";
import axios from "axios"
import EmployeeFields from "./EmployeeFields"
import _ from 'lodash'

class EmployeeTable extends Component{

    state= {
        employees:null,
        filteredEmployees:null,
        sortOrder:'asc'
    }
    
    getEmployees = async () => {
        const response = await axios.get('https://randomuser.me/api/?results=50&inc=picture,name,phone,email');
        this.setState({
            employees: response.data.results
                .map(result => {
                    return {
                        picture: result.picture.thumbnail,
                        name: `${result.name.first} ${result.name.last}`,
                        phone: result.phone,
                        email: result.email
                    };
                })
        });
    }

    componentDidMount(){
        this.getEmployees();
    }
    nameFilter = event =>{
        const searchTerm= event.target.value
        if( !searchTerm.length ){
            this.setState( {filteredEmployees: this.state.employees })
          } else {
           
            const filtered = this.state.employees.filter(employee => employee.name.toLowerCase().includes(searchTerm))
            
            this.setState( {filteredEmployees: filtered })
          }       
    }

    empSort = () => {
        if(this.state.filteredEmployees !== null){
            this.setState({//https://www.geeksforgeeks.org/lodash-_-orderby-method/
                filteredEmployees:_.orderBy((this.state.filteredEmployees), ['name'], [this.state.sortOrder]),
                sortOrder: this.state.sortOrder === "asc" ? "desc" : "asc"
                
            }
        )
        } else {
            this.setState({//https://www.geeksforgeeks.org/lodash-_-orderby-method/
                employees:_.orderBy((this.state.employees), ['name'], [this.state.sortOrder]),
                sortOrder: this.state.sortOrder === "asc" ? "desc" : "asc"
            }
        )
        }        
    }

   

    render(){
        
        return(
            <div>
                <div >
                    <label for="search"> Search First or Last Name </label>
                    <input type="text" onChange={this.nameFilter}/> <br/>
                    <br/>
                </div>
           
                <table >
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th> <button className="sort" onClick={this.empSort}>Name (click to sort)</button>
                            </th>
                            <th>Phone</th>
                            <th>Email</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.employees || this.state.filteredEmployees) ?
                         <EmployeeFields employees={this.state.filteredEmployees || this.state.employees} />
                        : <tr><td>No data</td></tr>}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EmployeeTable;