import { validateNumber } from "@/utils/validate"
import { DatePicker as DatePickerAnt } from "antd"
import dayjs from "dayjs"
import { CSSProperties, InputHTMLAttributes, ReactElement, useRef } from "react"
import { Control, Controller, FormState } from "react-hook-form"
import { twMerge } from "tailwind-merge"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  placeholder: string
  control: Control<any>
  formState: FormState<any>
  isNumberPhone?: boolean
  maxLength?: number
  icon?: ReactElement
  disabled?: boolean
  isNumber?: boolean
  isShowError?: boolean
  className?: string
  title?: string
  picker?: "date" | "week" | "month" | "quarter" | "year"
  style?: CSSProperties

  onClick?: () => void
  getValue?: (e: any) => void
}
const DatePicker = ({
  name,
  control,
  disabled = false,
  maxLength = 1000,
  formState,
  placeholder,
  autoComplete = "off",
  isNumberPhone = false,
  isShowError = true,
  className,
  icon,
  title,
  picker = "date",
  style = {
    fontSize: "18px",
    fontWeight: 500,
    fontFamily: "Inter-Regular",
  },
  onClick,
  getValue,
}: InputProps) => {
  const valueInputRef = useRef<string>("")

  const handleChangeInput = (
    value: string,
    onChange: (val: string) => void
  ) => {
    if (!value) {
      onChange("")
      return
    }

    if (!isNumberPhone) {
      onChange(value)
      return
    }
    if (isNumberPhone && value) {
      const validator = validateNumber(value)
      if (!validator) {
        onChange(value)
        valueInputRef.current = value
        return
      } else {
        return
      }
    }
  }
  const antDesignToDefaultStyle = `hover:border-[#dddddd] focus:border-[#dddddd] focus-within:border-[#dddddd] focus-within:shadow-none`
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, ...rest } }) => {
          return (
            <div>
              {icon}
              {title && (
                <label htmlFor={name}>
                  <p className="mb-1"> {title}</p>
                </label>
              )}
              <div className="relative">
                <DatePickerAnt
                  style={style}
                  value={value ? dayjs(value) : null}
                  placeholder={placeholder}
                  onChange={(_, dateString) => {
                    const value = String(dateString)
                    handleChangeInput(value.toString(), onChange)
                    if (!getValue) return
                    getValue(value)
                  }}
                  onClick={onClick}
                  onKeyDown={(e) => {}}
                  disabled={disabled}
                  autoComplete={autoComplete}
                  maxLength={maxLength}
                  className={twMerge(
                    `${antDesignToDefaultStyle} border-[1px] rounded-[4px] ${
                      isNumberPhone ? "ps-[45px]" : "ps-[11px]"
                    }  py-[9px] outline-none ${className}`
                  )}
                  picker={picker}
                  {...rest}
                />
              </div>
            </div>
          )
        }}
      />
      {formState.errors[name] && isShowError && (
        <p className="text-[#db4437] mt-[4px]">
          {formState.errors[name]?.message?.toString() || ""}
        </p>
      )}
    </div>
  )
}

export default DatePicker
