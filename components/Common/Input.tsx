"use client"
import { validateNumber } from "@/utils/validate"
import {
    forwardRef,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    ReactElement,
    useRef,
    useState
} from "react"
import { Control, Controller, FormState } from "react-hook-form"
import { twMerge } from "tailwind-merge"

type InputSize = "sm" | "md" | "lg"

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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
  isShowLabel?: boolean
  type: string
  hidePasswordIcon?: ReactElement
  showPasswordIcon?: ReactElement
  title?: string
  formatCardNumber?: (value: string) => string
  formatCurrency?: (value: string) => string | undefined
  validIcon?: ReactElement
  onClick?: () => void
  getValue?: (e: any) => void
  isDayField?: boolean
  isMonthField?: boolean
  variant?: "default" | "floating" | "outlined" | "filled"
  animated?: boolean
  size?: InputSize
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      control,
      disabled = false,
      maxLength = 1000,
      formState,
      placeholder,
      type = "text",
      autoComplete = "off",
      isNumberPhone = false,
      isShowLabel = false,
      isNumber = false,
      isShowError = true,
      className,
      icon,
      hidePasswordIcon,
      showPasswordIcon,
      title,
      formatCurrency,
      formatCardNumber,
      validIcon,
      onClick,
      getValue,
      isDayField,
      isMonthField,
      variant = "default",
      animated = true,
      size = "md",
      onFocus,
      onBlur,
      ...restProps
    },
    ref
  ) => {
    const [typeInput, setTypeInput] = useState<HTMLInputTypeAttribute>(type)
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [hasValue, setHasValue] = useState<boolean>(false)
    const valueInputRef = useRef<string>("")

    const handleChangeInput = (
      value: string,
      onChange: (val: string) => void
    ) => {
      setHasValue(!!value)

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

    const handleHideOrShowPassword = () => {
      if (type === "password") {
        if (typeInput === "password") setTypeInput("text")
        else setTypeInput("password")
      }
    }

    const handleCheckNextTab = (item: string) => {
      let value = item
      const inputs = document.querySelectorAll(".dob")
      if (isDayField && Number(value.charAt(0)) > 3) {
        value = `0{Number(value.charAt(0)}`
      }
      if (isMonthField && Number(value.charAt(0)) > 1) {
        value = `0{Number(value.charAt(0)}`
      }
      if (value.length >= 2) {
        if (isDayField) {
          const tab = inputs[1] as HTMLInputElement
          tab.focus()
        }
        if (isMonthField) {
          const tab = inputs[2] as HTMLInputElement
          tab.focus()
        }
      }
    }

    // Variant styles
    const getVariantStyles = () => {
      const hasError = formState.errors[name]

      switch (variant) {
        case "floating":
          return {
            container: "relative",
            input: twMerge(
              "peer w-full border-0 border-b-2 bg-transparent pt-6 pb-2 px-0 text-sm placeholder-transparent focus:outline-none transition-all duration-300",
              hasError
                ? "border-red-500 focus:border-red-600"
                : "border-gray-300 focus:border-orange-500",
              disabled && "opacity-50 cursor-not-allowed"
            ),
            label: twMerge(
              "absolute left-0 transition-all duration-300 text-gray-500 pointer-events-none",
              isFocused || hasValue
                ? "top-0 text-xs text-orange-600 transform -translate-y-1"
                : "top-4 text-sm",
              hasError && "text-red-500"
            ),
          }

        case "outlined":
          return {
            container: "relative",
            input: twMerge(
              "w-full border rounded-lg px-4 py-3 text-sm bg-transparent focus:outline-none placeholder-gray-400",
              hasError
                ? "border-red-500"
                : "border-gray-300 focus:border-orange-500",
              disabled && "opacity-50 cursor-not-allowed bg-gray-50"
            ),
            label: twMerge(
              "block text-sm font-medium mb-2 text-heading-light",
              hasError && "text-red-500"
            ),
          }

        case "filled":
          return {
            container: "relative",
            input: twMerge(
              "w-full border-0 rounded-lg px-4 py-3 text-sm bg-gray-100 focus:outline-none placeholder-gray-500",
              hasError ? "bg-red-50" : "focus:bg-white",
              disabled && "opacity-50 cursor-not-allowed"
            ),
            label: twMerge(
              "block text-sm font-medium mb-2 text-heading-light",
              hasError && "text-red-500"
            ),
          }

        default:
          return {
            container: "relative",
            input: twMerge(
              "w-full border rounded-lg px-4 py-3 text-sm focus:outline-none placeholder-gray-400",
              hasError
                ? "border-red-500"
                : "border-gray-300 focus:border-orange-500",
              disabled && "opacity-50 cursor-not-allowed bg-gray-50"
            ),
            label: twMerge(
              "block text-sm font-medium mb-2 text-heading-light",
              hasError && "text-red-500"
            ),
          }
      }
    }

    // Size styles
    const getSizeStyles = () => {
      switch (size) {
        case "sm":
          return "py-2 px-3 text-sm"
        case "lg":
          return "py-4 px-6 text-lg"
        default:
          return "py-3 px-4 text-base"
      }
    }

    // iOS Safari zoom prevention styles
    const getIOSZoomPreventionStyles = () => {
      return "text-base ios-zoom-fix" // Ensure minimum 16px font size on iOS and apply zoom prevention
    }

    const styles = getVariantStyles()

    return (
      <div className={twMerge("w-full", animated && "animate-fade-in")}>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange, ...rest } }) => {
            // Update hasValue state based on current value
            const currentHasValue = !!value
            if (currentHasValue !== hasValue) {
              setHasValue(currentHasValue)
            }

            return (
              <div className="space-y-1">
                {icon && (
                  <div className={animated ? "animate-slide-down" : ""}>
                    {icon}
                  </div>
                )}

                {title && variant !== "floating" && (
                  <label
                    htmlFor={name}
                    className={twMerge(
                      styles.label,
                      animated && "animate-slide-down animation-delay-100"
                    )}
                  >
                    {title}
                  </label>
                )}

                <div className={styles.container}>
                  <input
                    {...restProps}
                    ref={ref}
                    type={typeInput}
                    value={
                      (formatCardNumber && formatCardNumber(value)) ||
                      (formatCurrency && formatCurrency(value)) ||
                      value
                    }
                    onChange={(e) => {
                      handleChangeInput(e.target.value, onChange)
                      getValue && getValue(e.target.value)
                    }}
                    onFocus={(e) => {
                      setIsFocused(true)
                      onFocus?.(e)
                    }}
                    onBlur={(e) => {
                      setIsFocused(false)
                      onBlur?.(e)
                    }}
                    disabled={disabled}
                    maxLength={maxLength}
                    placeholder={variant === "floating" ? " " : placeholder}
                    autoComplete={autoComplete}
                    className={twMerge(
                      styles.input,
                      getSizeStyles(),
                      getIOSZoomPreventionStyles(),
                      className,
                      animated && "animate-slide-up animation-delay-200"
                    )}
                  />

                  {/* Floating label */}
                  {variant === "floating" && title && (
                    <label htmlFor={name} className={styles.label}>
                      {title}
                    </label>
                  )}

                  {/* Password toggle icon */}
                  {hidePasswordIcon && showPasswordIcon && (
                    <div
                      onClick={handleHideOrShowPassword}
                      className={twMerge(
                        "absolute z-10 text-xl top-1/2 -translate-y-1/2 right-4 cursor-pointer transition-all duration-300 hover:scale-110 text-gray-500 hover:text-orange-600",
                        animated && "animate-fade-in animation-delay-300"
                      )}
                    >
                      {typeInput === "password"
                        ? showPasswordIcon
                        : hidePasswordIcon}
                    </div>
                  )}

                  {/* Phone number prefix */}
                  {isShowLabel && (
                    <span
                      className={twMerge(
                        "absolute block top-1/2 -translate-y-1/2 left-4 z-10 text-gray-500",
                        animated && "animate-slide-in-left animation-delay-200"
                      )}
                    >
                      +61
                    </span>
                  )}

                  {/* Valid icon */}
                  {validIcon && value && !formState.errors[name] && (
                    <div
                      className={twMerge(
                        "absolute z-10 text-xl top-1/2 -translate-y-1/2 right-4 text-green-500",
                        animated && "animate-scale-in animation-delay-400"
                      )}
                    >
                      {validIcon}
                    </div>
                  )}

                  {/* Focus ring animation */}
                  {animated && isFocused && (
                    <div className="absolute inset-0 rounded-lg border-2 border-orange-500 animate-pulse pointer-events-none" />
                  )}
                </div>
              </div>
            )
          }}
        />

        {/* Error message */}
        {formState.errors[name] && isShowError && (
          <p
            className={twMerge(
              "text-red-500 text-sm mt-1",
              animated && "animate-slide-up animation-delay-100"
            )}
          >
            {formState.errors[name]?.message?.toString() || ""}
          </p>
        )}
      </div>
    )
  }
)

// Add display name for forwardRef component
InputField.displayName = 'InputField'

export default InputField
