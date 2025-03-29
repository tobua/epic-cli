import { scale } from 'optica'

export function Loader({ size = 20, color = 'black', rotate = true, ...props }) {
  return (
    <svg style={{ width: scale(size), height: scale(size) }} viewBox="0 0 52 50" {...props}>
      <title>Loader</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.7915 44.2353C36.0298 43.0573 36.4012 41.4938 37.4959 40.6167C42.0705 36.9515 45 31.3179 45 25C45 13.9543 36.0457 5 25 5C13.9543 5 5 13.9543 5 25C5 31.3179 7.92945 36.9515 12.5041 40.6167C13.5989 41.4938 13.9702 43.0573 13.2085 44.2353V44.2353C12.4716 45.3748 10.9497 45.7256 9.87005 44.9036C3.87179 40.3369 0 33.1206 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 33.1206 46.1282 40.3369 40.1299 44.9036C39.0503 45.7256 37.5284 45.3748 36.7915 44.2353V44.2353Z"
        fill={color}
      >
        <animateTransform
          attributeName="transform"
          attributeType="xml"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount={rotate ? 'indefinite' : 0}
          begin="0s"
        />
      </path>
    </svg>
  )
}
