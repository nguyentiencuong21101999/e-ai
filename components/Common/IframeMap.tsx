import React, { HTMLAttributeReferrerPolicy, PropsWithChildren } from "react"

const IframeMap: React.FC<
  PropsWithChildren<{
    src: string
    width: string
    height: string
    style: any
    allowFullScreen?: any
    loading: "eager" | "lazy" | undefined
    referrerPolicy: HTMLAttributeReferrerPolicy | undefined
  }>
> = ({
  children,
  src,
  width,
  height,
  style,
  loading,
  allowFullScreen = "",
  referrerPolicy,
}) => {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      style={style}
      loading={loading}
      referrerPolicy={referrerPolicy}
      allowFullScreen={allowFullScreen}
    ></iframe>
  )
}

export default IframeMap
