import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import windowSize from 'react-window-size';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';

class TimeSlider extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const { currentTime, sliderChange, player } = this.props;
    const videoDuration = player ? player.getDuration() : 100;

    return (
      <div className={css(styles.sliderRelativeBox)}>
        <div className={css(styles.sliderBox)}>
          <Slider
            className={css(styles.sliderStyle)} // inline styles for the outer div. Can also use className prop.
            domain={[0, videoDuration]}
            values={[currentTime]}
            onUpdate={sliderChange}
            onChange={sliderChange}>
            <Rail>
              {(
                { getRailProps } // adding the rail props sets up events on the rail
              ) => <div className={css(styles.railStyle)} {...getRailProps()} />}
            </Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <div className="slider-handles">
                  {handles.map(handle => (
                    <Handle key={handle.id} handle={handle} getHandleProps={getHandleProps} />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks right={false}>
              {({ tracks, getTrackProps }) => (
                <div className="slider-tracks">
                  {tracks.map(({ id, source, target }) => (
                    <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
                  ))}
                </div>
              )}
            </Tracks>
          </Slider>
        </div>
      </div>
    );
  }
}
export default windowSize(TimeSlider);

export function Handle({
  // your handle component
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div>
      <div
        style={{
          right: `calc(100% - ${percent}% - 60px)`,
          position: 'absolute',
          top: -40,
          zIndex: 3,
          width: 100,
          height: 80,
          border: 0,
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '50%',
          backgroundColor: '#2C4870',
          opacity: 0
        }}
        {...getHandleProps(id)}
      />
      <div
        style={{
          right: `calc(100% - ${percent}% - 20px)`,
          position: 'absolute',
          zIndex: 2,
          top: -10,
          width: 20,
          height: 20,
          border: 0,
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '50%',
          backgroundColor: '#2C4870',
          color: '#333'
        }}
      />
    </div>
  );
}

function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: 6,
        zIndex: 1,
        marginTop: -3,
        backgroundColor: '#546C91',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
    />
  );
}

const styles = StyleSheet.create({
  sliderRelativeBox: {
    position: 'relative',
    width: '70vw',
    marginLeft: '15vw'
  },
  sliderBox: {
    position: 'absolute',
    top: -30,
    left: 0,
    width: '100%'
  },
  sliderStyle: {
    position: 'relative',
    width: '100%',
    border: '1px solid steelblue'
  },
  railStyle: {
    position: 'absolute',
    top: -10,
    width: '100%',
    backgroundColor: '#8B9CB6'
  }
});
