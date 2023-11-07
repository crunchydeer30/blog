interface IMainProps {
  children: React.ReactNode;
}

const Main = (props: IMainProps) => {
  return (
    <main className="flex-1 px-4 md:px-16 2xl:px-56 overflow-auto">
      <section className="my-4 lg:my-12 mx-auto max-w-[900px]">
        {props.children}
      </section>
    </main>
  );
};

export default Main;
