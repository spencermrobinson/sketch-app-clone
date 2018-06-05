import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renameElement, deleteElement, addSelected } from '../../../../ducks/shapesReducer';
import './elementDisplay.css';
import trashCan from  '../projects-assets/trash-can.png';

class ElementDisplay extends Component{
    constructor(){
        super();
        this.state = {
            editName: null
        }
        this.editName = this.editName.bind(this);
        this.renameElement = this.renameElement.bind(this);
    }

    editName(val){
        this.setState({
            editName: val
        })
    };

    renameElement(e, val, id, pad){
        let b = val;
        let str = b.length;
        let editName = this.state.editName;
        let newVal = this.props.elements[editName].e_name;
       if(e.key === 'Enter' && str > 0 ){
          
          console.log('value', val);
          console.log('id', id);
          console.log('pad', pad)
          this.props.renameElement(id, val, pad);
          this.setState({
            editName: null,
            
          })
       
        }else if(e.key === 'Enter' && str === 0 ){
          let count = this.props.elements.length + 1;
          let newVal = `${count}`
          console.log('value', val);
          console.log('id', id);
          console.log('pad', pad)
          this.props.renameElement(id, val, pad);
          this.setState({
            editName: null,
            
          })   
    }
}


    render(){
        
        console.log("changed", this.props.changed)
        let elements = this.props.elements;
        let editName = this.state.editName;
        let displayElements = elements.length > 0 && elements.map((e,i) => {
           if(this.props.selected.id === e.id){
            return (
            <div id="ele-elements-display-blue" key ={i} onDoubleClick={() => this.editName(i)}>
            {   i === editName 
                ?
                    <input type='' className='' placeholder={elements[editName].e_name} onKeyPress={ (e) => this.renameElement(e, e.target.value, elements[editName].id, elements[editName].pad_id)}/> 
                : 
                    
                    <div onClick={()=> this.props.addSelected(this.props.elements[i])}>
                        
                    
                    { e.e_name !== null 
                    ? 
                        <div>{e.e_name}   {e.e_type}</div>
                    : 
                        <div>{e.e_type}</div>  
                        }
                    </div>
                }
             <div>
                <img id="ske-projects-rename" src={trashCan} alt="" onClick={()=> this.props.deleteElement(e.id, e.pad_id)}/>
             </div>
            </div> )}else if(this.props.elements){
                return(
                    <div id="ele-elements-display" key ={i} onDoubleClick={() => this.editName(i)}>
                    {   i === editName 
                        ?
                            <input type='' className='' placeholder={elements[editName].e_name} onKeyPress={ (e) => this.renameElement(e, e.target.value, elements[editName].id, elements[editName].pad_id)}/> 
                        : 
                            
                            <div onClick={()=> this.props.addSelected(this.props.elements[i])}>
                                
                            
                            { e.e_name !== null 
                            ? 
                                <div>{e.e_name}   {e.e_type}</div>
                            : 
                                <div>{e.e_type}</div>  
                                }
                            </div>
                        }
                     <div>
                        <img id="ske-projects-rename" src={trashCan} alt="" onClick={()=> this.props.deleteElement(e.id, e.pad_id)}/>
                     </div>
                    </div>   
                )
            }
        })
        return(
            <div>
            {displayElements}
            </div> 
        )
    }
}
function mapStateToProps(state){
    return {
        elements: state.shapes.shapes,
        selected: state.shapes.selected,
        selectedProject: state.projects.selectedProject,
        changed: state.shapes.changed
        
    }
}
export default connect(mapStateToProps,{ renameElement, deleteElement, addSelected })(ElementDisplay);