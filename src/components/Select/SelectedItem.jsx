export default function SelectedItem(props) {
  function handleClick(e) {
    e.stopPropagation();
    props.toggleOption(props.value);
    props.selectContainer.focus();
  }

  return (
    <button
      onClick={handleClick}
      className="group flex cursor-pointer items-center gap-1 rounded border-[0.01px] border-[#777] bg-none px-1 py-0.5 hover:border-red-600 hover:bg-[#ffcccc] focus:border-red-600 focus:bg-[#ffcccc]"
    >
      {props.value}
      <span className="group-hover:text-red-700 text-xl text-darkBlue transition-[color] group-focus:text-red-700">
        ×
      </span>
    </button>
  );
}
