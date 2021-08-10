import * as React from "react"

const Inbox = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 9h-6l-2 3H9L7 9H1m20 0v6a2 2 0 01-2 2H3a2 2 0 01-2-2V9m20 0l-3.45-6.89A2 2 0 0015.76 1H6.24a2 2 0 00-1.79 1.11L1 9"
        stroke="#004e96"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Inbox;
