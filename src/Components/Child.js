// import React, { useCallback } from 'react';
// import { useIframe } from 'use-iframe';
//
// export const Child = () => {
//
//   const handler = useCallback(message => {
//     switch (message.type) {
//       case "parent-says":
//         console.log(`The parent said: ${message.text}`)
//     }
//   }, [])
//
//   const [dispatch] = useIframe(handler)
//
//   const onClick = () => dispatch({ type: "child-says", text: "Hi, Parent!" })
//
//   return (
//     <div>
//       <button onClick={onClick}>Child say message</button>
//       <p>I am the child component</p>
//     </div>
//   )
// }
