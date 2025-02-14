import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ControllerFieldState } from "react-hook-form";

interface AuthInputProps {
  id?: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field?: any;
  disabled?: boolean;
  fieldState?: ControllerFieldState;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

const FormInput = ({
  id,
  type,
  field,
  disabled,
  fieldState,
  placeholder,
  value,
  onChange,
  autoComplete,
}: AuthInputProps) => {
  return (
    <Input
      className={cn(
        `form-input block w-full border-0 py-1.5 text-white shadow-sm 
          ring-1 ring-white dark:bg-transparent sm:text-sm lg:text-base sm:leading-6 
          focus-visible:ring-offset-0 focus:ring-0`,
        disabled && "opacity-50 cursor-default",
        fieldState?.error && "focus-visible:ring-red-900"
      )}
      id={id}
      type={type}
      autoComplete={autoComplete ?? "off"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...field}
    />
  );
};

export default FormInput;
