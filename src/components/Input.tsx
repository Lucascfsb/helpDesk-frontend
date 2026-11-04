type Props = React.ComponentProps<"input"> & {
  legend?: string;
};

export function Input({ legend, type = "text", ...rest }: Props) {
  return (
    <fieldset className="flex flex-1 max-h-20 text-gray-200 focus-within:text-blue-base">
      {legend && (
        <legend className="uppercase text-xxs text-inherit">{legend}</legend>
      )}
      <input
        type={type}
        className="w-full h-10 mb-4 border-b border-gray-300 px-4 text-base text-gray-200 bg-transparent outline-none focus:border-b-2 focus:border-blue-base placeholder-gray-400"
        {...rest}
      />
    </fieldset>
  );
}
