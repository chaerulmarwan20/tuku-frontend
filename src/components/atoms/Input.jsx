import css from "./atoms.module.css";

export default function Input({ cls, nm, onCg, plcHldr, type, val }) {
   return(
      <div className={cls}>
         <input placeholder={plcHldr} name={nm} onChange={onCg} type={type} value={val}/>
      </div>
   )
}