import React from 'react';
import './facerecognition.css';

const FaceRecognition = ({imgUrl, faceBoxs}) => {
  let boxDiv = faceBoxs.map((box, i) => {
    return (<div className='bounding-box' key={i} style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>)
  });
  // for (var i = 0; i < allBox.length; i++) {
  //   boxDiv.push(<div className='bounding-box' style={{top: allBox[i].topRow, right: allBox[i].rightCol, bottom: allBox[i].bottomRow, left: allBox[i].leftCol}}></div>);
  // }
  
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imgUrl} width="500px" height="auto"/>
        {boxDiv}
      </div>
    </div>
  );
}

export default FaceRecognition;