import React, { Component } from 'react';
import '../attributes.css';
import TiPlus from 'react-icons/lib/ti/plus';
import {connect} from 'react-redux';
import FaTrash from 'react-icons/lib/fa/trash';
import {updateSelected, addToChanged} from '../../../../ducks/shapesReducer';
import './basicshapeatt.css'


class SquareAttributes extends Component {
    constructor(){
        super()
        this.state = {
          opacityValue: 50,
          blur: true,
          blurValue: '',
          backgroundColor: '',
          borderWidth: 0,
          borderRadiusValue: 0
        }
      }

    
      handleOpacitySlider(e){
        this.props.updateOpacity(+e / 100)
        this.setState({
          opacityValue: +e
        })
        this.props.updateSelected();
        this.props.addToChanged();
      }

      handleOpacityInput(e){
          this.props.updateOpacity(+e / 100)
          this.setState({
            opacityValue: +e
          })
          this.props.updateSelected();
          this.props.addToChanged();


      }
    
      handleBlurSlider(e){     
        this.setState({
          blurValue: e
        })

        var blurString = `blur(${e}px)`

        this.props.updateBlur(blurString)
        this.props.updateSelected();
        this.props.addToChanged();

      }

      handleBlurInput(e){  

          this.setState({
            blurValue: e
          })
  
          var blurString = `blur(${e}px)`
  
          this.props.updateBlur(blurString)
          this.props.updateSelected();
          this.props.addToChanged();
 


      }

      handleIfBlurAdd(){
            this.props.addBlur()
            this.props.updateSelected();
            this.props.addToChanged();

      }

      handleIfBlurDelete(){
        this.props.deleteBlur() 
        this.props.updateSelected();
        this.props.addToChanged();
      }


      grabUpdatedColor(){
      var color = document.getElementById('newFillColor').value 
      this.props.updateFill(color)
      this.props.updateSelected();
      this.props.addToChanged();

      }

      updateBorder(e){
          var color = document.getElementById('newBorderColor').value
          var borderWidth = document.getElementById('newBorderWidth').value
          var borderType = document.getElementById('newBorderType').value
  
          var borderString = `${borderWidth}px ${borderType} ${color}`
          this.props.updateBorder(borderString)
          this.props.updateSelected();
          this.props.addToChanged();

      }

      updateShadow(e){

          let color = document.getElementById('newShadowColor').value
          let hOffset = document.getElementById('h-offset').value
          let vOffset = document.getElementById('v-offset').value
          let blur = document.getElementById('shadowBlur').value
          let spread = document.getElementById('shadowSpread').value
  
          var shadowString = `${hOffset ? hOffset: 2}px ${vOffset ? vOffset: 2}px ${blur ? blur : 2}px ${spread ? spread : 2}px ${color}`
          this.props.updateShadow(shadowString)
          this.props.updateSelected();
          this.props.addToChanged();




      }

      updatePosition(){
        let x = document.getElementById('positionX').value * 1;
        let y = document.getElementById('positionY').value * 1;
        this.props.updatePosition(x, y)
        this.props.updateSelected();
        this.props.addToChanged();
      }

      updateSize(){
        
        let width = document.getElementById('sizeWidth').value * 1;
        let height = document.getElementById('sizeHeight').value * 1;
        this.props.updateSize(width, height)
        this.props.updateSelected();
        this.props.addToChanged();
      }

      updateZIndex(e){
        this.props.updateZIndex(+e);
        this.props.updateSelected();
        this.props.addToChanged();
      }

      updateRotate(e){
        this.props.updateRotate(e);
        this.props.updateSelected();
        this.props.addToChanged();
      }

      copyCssCode(e, cssObj){
        e.stopPropagation();
        var old = JSON.stringify(cssObj).replace(/I/g, "-i").replace(/C/g, "-c").replace(/R/g, "-r").replace(/S/g, "-s").replace(/"/g, "").replace(/,/g, ";")
        const el = document.createElement('textarea');
        el.value = `Enter Class Name ${old}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
     }

     handleRadiusSlider(e){
      this.props.updateRadius(+e)
      this.setState({
        borderRadiusValue: +e
      })
      this.props.updateSelected();
      this.props.addToChanged();
     }

    render() { 


        //=================================================================//
        //===== Splits the box shadow string off the selected object ======//
        //=================================================================//
        
        var selectedBoxShadowSplitValues = this.props.shapes.selected.boxShadow ? this.props.shapes.selected.boxShadow.split(' ') : null
    
        var attributesTabs = 
        
        //=================================================================//
        //================ If there is a selected object ==================//
        //=================================================================//
        
        this.props.shapes.selected.type !== undefined ? 
        <div className = 'att-flex-column'>
        <div className = 'att-flex-row' style ={{marginBottom: 20, paddingTop: 20, borderTop: '1px solid #a5a5a5'}}>
          <label>Opacity</label>
          <input type = "range" max = {100} defaultValue = {this.props.shapes.selected.opacity ? this.props.shapes.selected.opacity : 100} min = {0} style = {{width: 100, backgroundColor: 'blue'}} onKeyPress = {(e) => {if(e.key === 'Enter'){this.handleOpacitySlider(+e.target.value)}} }/>
          <input id="att-opacity" placeholder = {this.props.shapes.selected.opacity || this.props.shapes.selected.opacity === 0 ? (this.props.shapes.selected.opacity * 100).toFixed(0) : 100} onKeyPress = {(e) => {if(e.key === 'Enter'){this.handleOpacitySlider(+e.target.value)}}}/>
        </div>
    
{        //=================================================================//
        //========= If selected object & it has a backgroundColor ==========//
        //=================================================================//
    }
            {this.props.shapes.selected.backgroundColor !== undefined ? 
          <div className = 'att-flex-column'>
            <div className = 'att-flex-row-closed'>
              <p>Fills</p>
              <div style = {{marginRight: 10, marginLeft: 'auto'}}>
                <FaTrash  style = {{fontSize: 15, color: '#7f7e7e'}} onClick = {() =>{this.props.deleteFill(); this.props.updateSelected()} }/>
              </div>
            </div>
            <div className = 'att-flex-row' style = {{marginBottom: 20}}>
            <div>
                <label>Fill Color:</label>
                <input id = "newFillColor" type = "color" value = {this.props.shapes.selected.backgroundColor} style = {{borderRadius: 6, width: 40}} onChange = {() => this.grabUpdatedColor()}/>
            </div>

            </div>
          </div>
     : //=================================================================//
        //=== If selected object & it does not have a backgroundColor ====//
        //=================================================================//
    
          <div className = 'att-flex-column'>
            <div className = 'att-flex-row-closed'>
              <p>Fills</p>
              <div style = {{marginRight: 10, marginLeft: 'auto'}}>
                <TiPlus  style = {{fontSize: 20, color: '#7f7e7e'}} onClick = {() => {this.props.addFill(); this.props.updateSelected()}}/>
              </div>
            </div>
          </div>}
            
{    //=================================================================//
    //============= If selected object & it has a border ==============//
    //=================================================================//
}            
            {this.props.shapes.selected.border !== undefined ? 
          <div className = "att-flex-column">
            <div className = 'att-flex-row-closed'>
              <p>Borders</p>
              <div style = {{marginRight: 10, marginLeft: 'auto'}}>
                <FaTrash  style = {{fontSize: 15, color: '#7f7e7e'}} onClick = {() => {this.props.deleteBorder(); this.props.updateSelected()}}/>
              </div>
            </div>
            <div className = 'att-flex-column' style = {{marginBottom: 20}}>
            <div style ={{margin: 10}}>
              <label>Color:</label>
              <input id = "newBorderColor" type = "color" defaultValue = {this.props.shapes.selected.borderColor} style = {{borderRadius: 6, width: 40}} onChange = {() => this.updateBorder()}/>              
            </div>
            <div style ={{margin: 10}}>
              <label>Thickness:</label>
              <input id = "newBorderWidth" style = {{width: 50}} onKeyPress = {(e) => {if(e.key === "Enter"){this.updateBorder(e.target.value)}}}/>              
            </div>
            <div style ={{margin: 10}}>
              <label>Type:</label>
              <select id = "newBorderType" defaultValue = "solid" style = {{width: 75}} onChange = {(e) => this.updateBorder(e.target.value)}>
                <option value = "dotted">Dotted</option>
                <option value = "dashed">Dashed</option>
                <option value = "solid">Solid</option>
                <option value = "none">None</option>
              </select>              
            </div>
          {this.props.shapes.selected.type === 'square' ? 
          <div className = "att-flex-row">
              <label>Radius</label>
              <input type = "range" max = {20} defaultValue = {this.props.shapes.selected.borderRadius ? this.props.shapes.selected.borderRadius : 0} min = {0} style = {{width: 100, backgroundColor: 'blue'}} onKeyPress = {(e) => {if(e.key === 'Enter'){this.handleRadiusSlider(+e.target.value)}} }/>
              <input style = {{backgroundColor: '#f3f3f3', color: 'grey'}} type = "text" disabled value = {this.props.shapes.selected.borderRadius || this.props.shapes.selected.borderRadius === 0 ? this.props.shapes.selected.borderRadius : 0}/> 
            </div> : null}  
            </div> 
            </div>:

        //=================================================================//
        //======== If selected object & it does not have a border =========//
        //=================================================================//

                  <div className = 'att-flex-row-closed'>
                  <p>Borders</p>
                  <div style = {{marginRight: 10, marginLeft: 'auto'}}>
                    <div id = "borders-plus" onClick = {() => {this.props.addBorder(); this.props.updateSelected()}}><TiPlus  style = {{fontSize: 20, color: '#7f7e7e'}}/></div>
                  </div>
                </div>}

{    //=================================================================//
    //============ If selected object & it has a boxShadow =============//
    //=================================================================//
} 
                {this.props.shapes.selected.boxShadow !== undefined ? <div className = "att-flex-column">
            <div className = 'att-flex-row-closed'>
              <p>Shadows</p>
              <div style = {{marginRight: 10, marginLeft: 'auto'}}>
                <FaTrash  style = {{fontSize: 15, color: '#7f7e7e'}} onClick = {() => {this.props.deleteShadow(); this.props.updateSelected()}}/>
              </div>
            </div>
            <div className = 'att-flex-row' style = {{marginTop: 0}}>
              <input id = "newShadowColor" type = "color" defaultValue = {selectedBoxShadowSplitValues[4] ? selectedBoxShadowSplitValues[4] : '#987D7D'} style = {{borderRadius: 6, width: 40}} onChange = {() => this.updateShadow()}/>
              <div className = 'att-flex-row' style ={{flexWrap: 'wrap', marginBottom: 20}}>
              <div>
                <label>H-Offset:</label>
                <input id = "h-offset" defaultValue = {selectedBoxShadowSplitValues[0][0] ? selectedBoxShadowSplitValues[0][0] * 1 : 0} style = {{width: '30%', fontSize: 10}} onKeyPress = {(e) =>{if(e.key === 'Enter'){this.updateShadow(e.target.value)}} }/>                
              </div>
              <div>
                <label>V-Offset:</label>
                <input id = "v-offset" defaultValue = {selectedBoxShadowSplitValues[1][0] ? selectedBoxShadowSplitValues[1][0] * 1 : 0} style = {{width: '30%', fontSize: 10, marginTop: 10}} onKeyPress = {(e) =>{if(e.key === 'Enter'){this.updateShadow(e.target.value)}} }/>
              </div>
              <div>
                <label>Blur:</label>
                <input id = "shadowBlur" defaultValue = {selectedBoxShadowSplitValues[2][0] ? selectedBoxShadowSplitValues[2][0] * 1 : 0} style = {{width: '30%', fontSize: 10, marginTop: 10}} onKeyPress = {(e) =>{if(e.key === 'Enter'){this.updateShadow(e.target.value)}} }/>
              </div>
              <div>
                <label>Spread:</label>
                <input id = "shadowSpread" defaultValue = {selectedBoxShadowSplitValues[3][0] ? selectedBoxShadowSplitValues[3][0] * 1 : 0} style = {{width: '30%', fontSize: 10, marginTop: 10}} onKeyPress = {(e) =>{if(e.key === 'Enter'){this.updateShadow(e.target.value)}} }/>
              </div>
              </div>
    
            </div> 
            </div>:

        //=================================================================//
        //====== If selected object & it does not have a boxShadow ========//
        //=================================================================//
            <div className = "att-flex-column">
             <div className = 'att-flex-row-closed'>
                <p>Shadows</p>
                <div style = {{marginRight: 10, marginLeft: 'auto'}}>
                  <div id = "shadows-plus" onClick = {() => {this.props.addShadow(); this.props.updateSelected()}}><TiPlus style = {{fontSize: 20, color: '#7f7e7e'}} /></div>
                </div>
              </div>
            </div>
                  }

{    //=================================================================//
    //========== If selected object & it has a filter(blur) ============//
    //=================================================================//
} 
            {this.props.shapes.selected.filter !== undefined ? 
             <div className = "att-flex-column">
             <div className = 'att-flex-row-closed'>
               <p>Blur</p>
               <FaTrash id="att-blur"  onClick = {() => this.handleIfBlurDelete()} style = {{fontSize: 15, color: '#7f7e7e', marginRight: 10}}/>
               </div>

{    //============================================================================//
    //= If selected object & it has a filter(blur) & they checked the box to blur =//
    //=============================================================================//
}        
               {this.props.shapes.selected.filter !== undefined ? 
               <div className = "att-flex-column">
               <div className = 'att-flex-row'>
                    <label>Amount</label>
                    <input defaultValue = {+(this.props.shapes.selected.filter[6] !== 'p' ? this.props.shapes.selected.filter[5] + this.props.shapes.selected.filter[6] : this.props.shapes.selected.filter[5])} onKeyPress = {(e) => {if(e.key === 'Enter'){this.handleBlurInput(+e.target.value)}} }/>
               </div>
               <input style = {{margin: 20}} type = "range" value = {+(this.props.shapes.selected.filter[6] !== 'p' ? this.props.shapes.selected.filter[5] + this.props.shapes.selected.filter[6] : this.props.shapes.selected.filter[5])} max = {50} min = {0} onChange = {(e) => this.handleBlurSlider(e.target.value)}/>
               </div>
: null}
               </div> : 

        //=================================================================//
        //===== If selected object & it does not have a filter(blur) ======//
        //=================================================================// 

        <div className = "att-flex-column">
        <div className = 'att-flex-row-closed'>
          <p>Blur</p>
          <TiPlus id="att-blur" onClick = {() => this.handleIfBlurAdd()}   style = {{marginRight: 10, fontSize: 20, color: '#7f7e7e'}}/>
          </div> 
               </div>}
               {this.props.shapes.selected.zIndex !== undefined || this.props.shapes.selected.zIndex === 0 ? 
               <div className = "att-flex-column" 
               onMouseOver={()=>document.getElementById('att-zindex-shape').style.visibility = "visible"}        
               onMouseLeave={()=>document.getElementById('att-zindex-shape').style.visibility = "hidden"}>
                 <div className = "att-flex-row" >
                 
                    <label>Bring Forward/Backward</label>
                    <input type = "number" min = {0} max = {100} value = {this.props.shapes.selected.zIndex ? this.props.shapes.selected.zIndex : 0} onChange = {(e) => this.updateZIndex(e.target.value)}/>
                    <div id="att-zindex-shape">
                      <li onClick={()=>this.updateZIndex(0)}>Send to Back</li>
                      <li onClick={()=>this.updateZIndex(100)}>Send to Front</li>
                    </div>
                 </div>
               </div>: 
              <div className = "att-flex-column">
                <div className = "att-flex-row">
                  <label>Bring Forward/Backward</label>
                  
                </div>
              </div>} 

              <div className = 'att-flex-row-closed' style = {{justifyContent: 'space-around', alignItems: 'center', textAlign: 'center', margin: 10}}>
                <button id = "copy-css-btn" onClick = {(e) => this.copyCssCode(e, {position: "absolute", height: this.props.shapes.selected.height + "px", width: this.props.shapes.selected.width + "px", top: this.props.shapes.selected.top + "px", left: this.props.shapes.selected.left + "px", zIndex: this.props.shapes.selected.zIndex, backgroundColor: this.props.shapes.selected.backgroundColor, borderRadius: this.props.shapes.selected.borderRadius[this.props.shapes.selected.borderRadius.length - 1] === '%' ? this.props.shapes.selected.borderRadius : this.props.shapes.selected.borderRadius + "px", border: this.props.shapes.selected.border, boxShadow: this.props.shapes.selected.boxShadow, opacity: this.props.shapes.selected.opacity, transform: this.props.shapes.selected.transform, filter: this.props.shapes.selected.filter})}>Copy CSS Code</button>
              </div>     
          </div>
    
        : 

        //=================================================================//
        //============== If there is not a selected object ================//
        //=================================================================//   

        <div className = 'att-flex-column' style = {{marginTop: 20}}>
          <div className = 'att-flex-row-closed'>
              <p>Fills</p>
              <div style = {{marginRight: 10, marginLeft: 'auto'}}>
                <TiPlus  style = {{fontSize: 20, color: '#7f7e7e'}}/>
              </div>
          </div>
          <div className = 'att-flex-row-closed'>
            <p>Borders</p>
            <div style = {{marginRight: 10, marginLeft: 'auto'}}>
              <TiPlus  style = {{fontSize: 20, color: '#7f7e7e'}}/>
            </div>
          </div>
          <div className = 'att-flex-row-closed'>
            <p>Shadows</p>
            <div style = {{marginRight: 10, marginLeft: 'auto'}}>
              <TiPlus  style = {{fontSize: 20, color: '#7f7e7e'}}/>
            </div>
          </div>  
          <div className = 'att-flex-row-closed'>
            <p>Blur</p>
            <div style = {{marginRight: 10, marginLeft: 'auto'}}>
              <TiPlus style = {{fontSize: 20, color: '#7f7e7e'}}/>
            </div>
          </div>                
        </div>
      
    
    
        //=================================================================//
        //======== Position, Size, and Rotate are always visible  =========//
        //=================================================================//

        return (
          <div className = "att-flex-column">
            <div className = "att-section-1">
              <div className = "att-flex-row">
                <label>Position</label>
                <div style ={{display: 'flex', flexDirection: "column"}}>
                  <label style = {{fontSize: 11}}>x:</label>
                  <input min = {0} style = {{backgroundColor: '#f3f3f3', color: 'grey'}} disabled id = "positionX" value = {this.props.shapes.selected.left ? this.props.shapes.selected.left : 0} onKeyPress = {(e) => {if(e.key === 'Enter'){this.updatePosition(e.target.value)}} }/>
                </div>
                <div style ={{display: 'flex', flexDirection: "column"}}>
                  <label style = {{fontSize: 11}}>y:</label>
                  <input min = {0} style = {{backgroundColor: '#f3f3f3', color: 'grey'}} disabled id = "positionY" value = {this.props.shapes.selected.top ? this.props.shapes.selected.top : 0} onKeyPress = {(e) => {if(e.key === 'Enter'){this.updatePosition(e.target.value)}} }/>
                </div>
              </div>
              <div className = "att-flex-row">
                <label>Size</label>
                <div style ={{display: 'flex', flexDirection: "column", marginLeft: 28}}>
                  <label style = {{fontSize: 11}}>Width:</label>
                  <input min = {0} style = {{backgroundColor: '#f3f3f3', color: 'grey'}} disabled id = "sizeWidth" onKeyPress = {(e) => {if(e.key === 'Enter'){this.updateSize(e.target.value)}} } value = {this.props.shapes.selected.width ? this.props.shapes.selected.width : 0}/>
                </div>
                <div style ={{display: 'flex', flexDirection: "column"}}>
                  <label style = {{fontSize: 11}}>Height:</label>
                  <input min = {0} style = {{backgroundColor: '#f3f3f3', color: 'grey'}} disabled id = "sizeHeight" onKeyPress = {(e) => {if(e.key === 'Enter'){this.updateSize(e.target.value)}} } value = {this.props.shapes.selected.height ? this.props.shapes.selected.height : 0}/>
                </div>
              </div>
              <div className = "att-flex-row">
                <label>Rotate</label>
                <input id="att-rotate" defaultValue = {this.props.rotateAmt} onKeyPress = {(e) => {if(e.key === 'Enter'){this.updateRotate(e.target.value)}} }/>
              </div>
            </div>
            {attributesTabs}
            
          </div>
        )
      }
       
    }


function mapStateToProps(state){
    return {
      shapes: state.shapes
    }
  }
  export default connect(mapStateToProps, {updateSelected, addToChanged})(SquareAttributes);
