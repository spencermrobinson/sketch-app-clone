import React, { Component } from 'react';
import './sketchpad.css';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addShapeToArray, updateSelected, updateTextOnSelected } from '../../ducks/shapesReducer'

import Attributes from './Attributes/Attributes'
import Toolbar from './Toolbar/Toolbar'
import Projects from './Projects/Projects'
import Shape from './Shape/Shape'
// import shapes from './Functions/shapes'

class Sketchpad extends Component {
  constructor() {
    super();
  
    this.state = {
     resize_bottom: false,
     resize_top: false,
     resize_left: false,
     resize_right: false,
     mouseX: 0,
     mouseY: 0,
     menuOn: false,
    }

    this.changeMenu = this.changeMenu.bind(this);
    this.addShapeToArray = this.addShapeToArray.bind(this);
    this.updateText = this.updateText.bind(this);
   }
   addShapeToArray(attributes, sketchpad) {
     this.props.addShapeToArray(attributes, sketchpad)
    // this.setState({ shapes: [...this.state.shapes, attributes]})
   }
   trackMouse(e) {
    this.setState({ mouseX: e.pageX, mouseY: e.pageY})
   }
   
    changeMenu() {
      this.setState({ menuOn: !this.state.menuOn})
    }
    menuOff() {
    this.setState({ menuOn: false })
    }

    updateText(newText){
      console.log('selected', this.props.shapes.selected)
      var updateText = Object.assign({}, this.props.shapes.selected, {text: newText});
      this.props.updateTextOnSelected(updateText);
      this.props.updateSelected()
    }
   render() {
     
     if (!this.props.user.id) {
       return <Redirect push to="/"/>
      }
      
      let { shapes } = this.props;
      var shapesArr = shapes.shapes.map((item, i) => {
        if (item.e_type === 'circle' || item.e_type === 'square'){
          var itemObjWithType = {
            className: `shape_${item.id}`,
            id: item.id,
            borderRadius: item.body.borderRadius,
            backgroundColor: item.body.backgroundColor,
            height: item.body.height,
            width: item.body.width,
            top: item.body.top,
            left: item.body.left,
            type: item.e_type,
            border: item.body.border,
            borderColor: item.body.borderColor,
            boxShadow: item.body.boxShadow,
            opacity: item.body.opacity,
            transform: item.body.transform,
            filter: item.body.filter,
            zIndex: item.body.zIndex
  
          }
        } else if (item.e_type === 'text'){
          var itemObjWithType = {
            className: `shape_${item.id}`,
            id: item.id,
            height: item.body.height,
            width: item.body.width,
            top: item.body.top,
            left: item.body.left,
            backgroundColor: item.body.backgroundColor,
            zIndex: item.body.zIndex,
            type: item.e_type,
            color: item.body.color,
            fontSize: item.body.fontSize,
            fontFamily: item.body.fontFamily,
            fontWeight: item.body.fontWeight,
            letterSpacing: item.body.letterSpacing,
            lineHeight: item.body.lineHeight,
            textAlign: item.body.textAlign,
            text: item.body.text
          }
        }

        return (
         <div key={i}>
          <Shape item = {itemObjWithType} updateText = {this.updateText}/>   
         </div>
        )
      })
    return (
     <div className="ske-wrapper" onMouseMove={(e)=>this.trackMouse(e)} onClick={() => this.menuOff()}>

        <Toolbar 
        changeMenu={this.changeMenu} 
        menuOn={this.state.menuOn} 
        addShapeToArray={this.addShapeToArray}/>
        
         <div id="ske-lower-area">
         <Projects />
         <div id="ske-sketchpad">
         {shapesArr}
         </div>
         <Attributes />
        </div>
        
        
      </div>
    )
   }
}
function mapStateToProps(state) {
  let { user } = state.users;
  let { shapes } = state;
  return {
    user,
    shapes
  }
}

export default connect(mapStateToProps, { addShapeToArray, updateSelected, updateTextOnSelected })(Sketchpad);
