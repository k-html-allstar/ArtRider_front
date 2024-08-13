export default function Backdrop({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-[9999]"
    >
      <div
        className="absolute top-[50%] left-[50%] z-[10000] w-362 h-292 rounded-20 bg-white p-20"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
