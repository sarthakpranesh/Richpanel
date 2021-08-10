import * as React from "react"

const Refresh = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23 2v6m0 0h-6m6 0l-4.64-4.36A9 9 0 003.51 7L23 8zM1 18v-6m0 0h6m-6 0l4.64 4.36A9 9 0 0020.49 13"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Refresh;
