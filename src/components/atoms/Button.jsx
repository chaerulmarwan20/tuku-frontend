export default function Button({ btnClr, cls, ftClr, func, val, isDismiss }) {
  return isDismiss ? (
    <div onClick={func} name={val} data-dismiss="modal">
      <button
        className={"displayRow " + cls}
        style={{ background: btnClr, color: ftClr }}
        type="submit"
      >
        <span style={{ margin: "auto" }}>{val}</span>
      </button>
    </div>
  ) : (
    <div onClick={func} name={val}>
      <button
        className={"displayRow " + cls}
        style={{ background: btnClr, color: ftClr }}
        type="submit"
      >
        <span style={{ margin: "auto" }}>{val}</span>
      </button>
    </div>
  );
}
