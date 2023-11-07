interface IPageWrapperProps {
  children: React.ReactNode
}

const PageWrapper = (props : IPageWrapperProps) => {
  return (
    // <div className="sm:flex sm:flex-row sm:w-screen sm:h-screen sm:overflow-hidden text-primary">{props.children}</div>
    <div className="flex flex-col sm:flex-row w-full text-primary">{props.children}</div>
  )
}

export default PageWrapper