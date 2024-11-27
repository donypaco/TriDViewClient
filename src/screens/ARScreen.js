// import {
//     ViroARScene,
//     ViroARSceneNavigator,
//     ViroText,
//     ViroTrackingStateConstants,
//   } from "@reactvision/react-viro";
//   import React, { useState } from "react";
//   import { StyleSheet } from "react-native";
  
//   // Define the AR Scene
//   const HelloWorldSceneAR = () => {
//     const [text, setText] = useState("Initializing AR...");
  
//     function onInitialized(state, reason) {
//       if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
//         setText("Hello World!");
//       } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
//         // Handle loss of tracking if necessary
//         setText("Tracking Unavailable");
//       }
//     }
  
//     return (
//       <ViroARScene onTrackingUpdated={onInitialized}>
//         <ViroText
//           text={text}
//           scale={[0.5, 0.5, 0.5]}
//           position={[0, 0, -1]}
//           style={styles.helloWorldTextStyle}
//         />
//       </ViroARScene>
//     );
//   };
  
//   // Export ARScreen Component
//   const ARScreen = () => {
//     return (
//       <ViroARSceneNavigator
//         autofocus={true}
//         initialScene={{
//           scene: HelloWorldSceneAR,
//         }}
//         style={styles.f1}
//       />
//     );
//   };
  
//   const styles = StyleSheet.create({
//     f1: { flex: 1 },
//     helloWorldTextStyle: {
//       fontFamily: "Arial",
//       fontSize: 30,
//       color: "#ffffff",
//       textAlignVertical: "center",
//       textAlign: "center",
//     },
//   });
  
//   export default ARScreen; // Export the ARScreen component
