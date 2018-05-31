import React, {Component} from 'react';
import './attributes.css';
import {connect} from 'react-redux';
import BasicShapeAtt from './BasicShapeAtt/BasicShapeAtt';
import TriangleAndStarAtt from './TriangleAndStarAtt/TriangleAndStarAtt';
import {addFillToSelected, deleteFillFromSelected, deleteBorderFromSelected, updateFillOnSelected, addBorderOnSelected,updateBorderOnSelected, addShadowOnSelected, deleteShadowOnSelected, updateShadowOnSelected, addBlurOnSelected, deleteBlurOnSelected, updateBlurOnSelected, updateOpacityOnSelected} from '../../../ducks/shapesReducer'

class Attributes extends Component {
  constructor(){
    super()
    this.state ={

    }
    this.addFillOnSelected = this.addFillOnSelected.bind(this);
    this.deleteFillOnSelected = this.deleteFillOnSelected.bind(this);
    this.addBorderOnSelected = this.addBorderOnSelected.bind(this);
    this.deleteBorderOnSelected = this.deleteBorderOnSelected.bind(this);
    this.updateFillOnSelected = this.updateFillOnSelected.bind(this);
    this.updateBorderOnSelected = this.updateBorderOnSelected.bind(this);
    this.addShadowOnSelected = this.addShadowOnSelected.bind(this);
    this.deleteShadowOnSelected = this.deleteShadowOnSelected.bind(this);
    this.updateShadowOnSelected = this.updateShadowOnSelected.bind(this);
    this.addBlurOnSelected = this.addBlurOnSelected.bind(this);
    this.deleteBlurOnSelected = this.deleteBlurOnSelected.bind(this);
    this.updateBlurOnSelected = this.updateBlurOnSelected.bind(this);
    this.updateOpacityOnSelected = this.updateOpacityOnSelected.bind(this);
  }

              // Selected Shape Background Color Manipulation //

  addFillOnSelected(){
    var combinedWithBC = Object.assign({}, this.props.shapes.selected, {backgroundColor: '#939393'})
    this.props.addFillToSelected(combinedWithBC)
  }

  deleteFillOnSelected(){
    var withoutBC = Object.assign({}, this.props.shapes.selected, {backgroundColor: undefined})
    this.props.deleteFillFromSelected(withoutBC)
  }

  updateFillOnSelected(color){
    var updateBC = Object.assign({}, this.props.shapes.selected, {backgroundColor: color})
    this.props.updateFillOnSelected(updateBC)
  }
              // Selected Shape Border Manipulation //

  addBorderOnSelected(){
    var combinedWithBorder = Object.assign({}, this.props.shapes.selected, {border: 2})
    this.props.addBorderOnSelected(combinedWithBorder)

  }

  deleteBorderOnSelected(){
    var withoutBorder = Object.assign({}, this.props.shapes.selected, {border: undefined})
    this.props.deleteBorderFromSelected(withoutBorder)
  }

  updateBorderOnSelected(color, borderWidth){
    var width = borderWidth ? borderWidth : this.props.shapes.selected.border
    var updateBorder = Object.assign({}, this.props.shapes.selected, {border: width, borderColor: color})
    this.props.updateBorderOnSelected(updateBorder)
  }
  
  addShadowOnSelected(){
    var combinedWithShadow = Object.assign({}, this.props.shapes.selected, {boxShadow: '2px 2px 2px 2px #000000'})
    this.props.addShadowOnSelected(combinedWithShadow)
  }

  deleteShadowOnSelected(){
    var withoutShadow = Object.assign({}, this.props.shapes.selected, {boxShadow: undefined})
    this.props.deleteShadowOnSelected(withoutShadow)
  }

  updateShadowOnSelected(shadowString){
    var updatedBoxShadow = Object.assign({}, this.props.shapes.selected, {boxShadow: shadowString})
    this.props.updateShadowOnSelected(updatedBoxShadow)
    
  }

  addBlurOnSelected(){
    var combinedWithShadow = Object.assign({}, this.props.shapes.selected, {filter: `blur(4px)`})
    this.props.addBlurOnSelected(combinedWithShadow)
  }

  deleteBlurOnSelected(){
    var withoutBlur = Object.assign({}, this.props.shapes.selected, {filter: undefined})
    this.props.deleteBlurOnSelected(withoutBlur)
  }

  updateBlurOnSelected(filterString){
    var updatedBlur = Object.assign({}, this.props.shapes.selected, {filter: filterString})
    this.props.updateBlurOnSelected(updatedBlur)
  }

  updateOpacityOnSelected(opacity){
    var updatedOpacity = Object.assign({}, this.props.shapes.selected, {filter: opacity})
    this.props.updateOpacityOnSelected(updatedOpacity)
  }

  render(){
    console.log('opacity', this.props.shapes.selected.opacity)
    console.log('backgroundColor', this.props.shapes.selected.backgroundColor)
    console.log('border', this.props.shapes.selected.border, this.props.shapes.selected.borderColor)
    console.log('shadows', this.props.shapes.selected.boxShadow)
    console.log('filter',this.props.shapes.selected.filter)

    var typeSelected = this.props.shapes.selected.type === 'square' || this.props.shapes.selected.type === 'circle' ? 
    <BasicShapeAtt 
      addFill = {this.addFillOnSelected} 
      deleteFill = {this.deleteFillOnSelected} 
      updateFill = {this.updateFillOnSelected} 
      addBorder = {this.addBorderOnSelected} 
      deleteBorder = {this.deleteBorderOnSelected}
      updateBorder = {this.updateBorderOnSelected}
      addShadow = {this.addShadowOnSelected}
      deleteShadow = {this.deleteShadowOnSelected}
      updateShadow = {this.updateShadowOnSelected}
      addBlur = {this.addBlurOnSelected}
      deleteBlur = {this.deleteBlurOnSelected}
      updateBlur = {this.updateBlurOnSelected}
      updateOpacity = {this.updateOpacityOnSelected}/> 
    
    : <TriangleAndStarAtt />
   return (
     <div id = "ske-attributes">
       {typeSelected}
     </div>
   )
  }
}

function mapStateToProps(state){
  return {
    shapes: state.shapes
  }
}
export default connect(mapStateToProps, {addFillToSelected, deleteFillFromSelected, deleteBorderFromSelected, updateFillOnSelected, addBorderOnSelected, updateBorderOnSelected, addShadowOnSelected, deleteShadowOnSelected, updateShadowOnSelected, addBlurOnSelected, deleteBlurOnSelected, updateBlurOnSelected, updateOpacityOnSelected})(Attributes);
