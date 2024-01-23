import { Link, useMatch } from "react-router-dom"

type Props = {
  to: string,
  children: React.ReactNode,
}

export const CustomLink = ({to, children, ...props}: Props) => {
  const match = useMatch(to)
  return (
    <Link 
      to={to} 
      {...props}
      style={{
        color: match ? 'blue' : '#000000'
      }}
    >
      {children}
    </Link>
  )
}