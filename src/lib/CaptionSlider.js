import React from 'react';
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/captioned.css';


class CaptionSlider extends React.Component {
  constructor(props){
    super(props)
    this.renderScreens = this.renderScreens.bind(this)
  }

  renderScreens() {
    return this.props.screens.map((screen, index) => (
      <div
        key={`${this.props.name}-screen-${index}`}
        data-src={screen.media}
        style={{
          backgroundColor: screen.backgroundColor,
        }}
      >
        <div data-type="caption">
          <p>{screen.caption}</p>
        </div>
      </div>
    ));
  }

  render(){
    return (
      <AwesomeSlider {...this.props}>
        {this.renderScreens()}
      </AwesomeSlider>
    );
  }
}

export default CaptionSlider
