/* eslint-disable @next/next/no-img-element */
import cn from "clsx"
import React, { useState } from "react"

export const Img = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ src, onError, className, ...props }, ref) => {
    const [loading, setLoading] = useState(true)

    const handleLoad = (): void => setLoading(false)

    return (
      <img
        ref={ref}
        src={src || "/dummy/rectangle913.png"}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src = "/dummy/rectangle913.png"
        }}
        alt=""
        onLoad={handleLoad}
        className={cn(className, loading && "animate-pulse bg-dark-secondary")}
        {...props}
      />
    )
  }
)

Img.displayName = "Img"
