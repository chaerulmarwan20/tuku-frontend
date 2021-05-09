import css from './style.module.css'
import { useState } from 'react'
// ATOMS
import Button from '../../../atoms/Button'
// IMAGES
import Left from '../../../images/left.png'
import Right from '../../../images/right.png'

export default function Sizes({ cat, catState }) {
   // CATEGORY ARRAY
   const categoryArray = ["Jacket", "Pants", "Sandals", "Shoes", "Shorts", "T-Shirt"]
   // STATE HOOKS
   const [startNum, setStart] = useState(0)
   const [endNum, setEnd] = useState(3)
   // ARROW FUNCTION
   const leftArrow = () => {
      if(startNum > 0) {
         setStart(startNum - 1)
         setEnd(endNum - 1)
      }
   }
   const rightArrow = () => {
      if(endNum < categoryArray.length) {
         setStart(startNum + 1)
         setEnd(endNum + 1)
      }
   }
   return(
      <div className={"displayColumn " + css.paddingFilter}>
         <div className={css.filterCategoryText}>Categories</div>
         <div className={"displayRow " + css.filterOption}>
            {
            categoryArray.length < 3 ? 
            null
            :
            startNum === 0 ?
            <img className={css.filterArrowLeft} src={Left} style={{opacity: "0.11"}}/>
            : 
            <img className={"hoverThis " + css.filterArrowLeft} onClick={ () => { leftArrow() } } src={Left}/>
            }
            {categoryArray.slice(startNum, endNum).map((item) => 
               <div onClick={catState}>
                  <Button 
                     cls={
                        cat === item ? 
                        "hoverThis " + css.ctgBtn + " " + css.selectCategory 
                        : 
                        "hoverThis " + css.ctgBtn + " " + css.unselectCategory
                     } 
                     val={item}
                  />
               </div>
            )}
            {
            categoryArray.length < 3 ? 
            null 
            :
            startNum === 3 ?
            <img className={css.filterArrowRight} src={Right} style={{opacity: "0.11"}}/>
            :
            <img className={"hoverThis " + css.filterArrowRight} onClick={ () => { rightArrow() } } src={Right}/>
            }
         </div>
      </div>
   )
 }