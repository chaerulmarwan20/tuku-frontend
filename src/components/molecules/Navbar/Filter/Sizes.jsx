import css from './style.module.css'
import { useState } from 'react'
// ATOMS
import Button from '../../../atoms/Button'
// IMAGES
import Left from '../../../images/left.png'
import Right from '../../../images/right.png'

export default function Sizes({ alph ,cat, num }) {
   const sizeAlphabetArray = ["XS", "S", "M", "L", "XL"]
   const sizeNumericArray = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52]
   // ARROW FUNCTION
   const [startNum, setStart] = useState(0)
   const [endNum, setEnd] = useState(5)
   const leftArrow = () => {
      if(startNum > 0) {
         setStart(startNum - 1)
         setEnd(endNum - 1)
      }
   }
   const rightArrow = () => {
      if(endNum < sizeNumericArray.length) {
         setStart(startNum + 1)
         setEnd(endNum + 1)
      }
   }
   return(
      <div className={"displayColumn " + css.paddingFilter}>
         <div className={css.filterCategoryText}>Sizes</div>
         <div className={"displayRow " + css.filterOption}>
         {
         cat === "Sandals" || cat === "Shoes" ?
         <div className={"displayRow"}>
            {
            sizeNumericArray.length < 5 ? 
            null
            :
            startNum === 0 ?
            <img className={css.filterArrowLeft} src={Left} style={{opacity: "0.11"}}/>
            : 
            <img className={"hoverThis " + css.filterArrowLeft} onClick={ () => { leftArrow() } } src={Left}/>
            }
            {
            sizeNumericArray.slice(startNum, endNum).map((item) => 
               <Button 
                  cls={
                     parseInt(num[0]) === item ? 
                     "hoverThis " + css.sizeBtn + " " + css.selectSize 
                     : 
                     "hoverThis " + css.sizeBtn + " " + css.unselectSize
                  } 
                  func={ num[1] }
                  val={item}
               />
            )}
            {
            sizeNumericArray.length < 5 ? 
            null 
            :
            startNum === 21 ?
            <img className={css.filterArrowRight} src={Right} style={{opacity: "0.11"}}/>
            :
            <img className={"hoverThis " + css.filterArrowRight} onClick={ () => { rightArrow() } } src={Right}/>
            }
         </div>
         :
         sizeAlphabetArray.map((item) => 
            <Button 
               cls={
                  alph[0] === item ? 
                  "hoverThis " + css.sizeBtn + " " + css.selectSize 
                  : 
                  "hoverThis " + css.sizeBtn + " " + css.unselectSize
               } 
               func={ alph[1] }
               val={item}
            />
         )}
         </div>
      </div>
   )
 }