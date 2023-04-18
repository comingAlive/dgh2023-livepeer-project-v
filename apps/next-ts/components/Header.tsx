const Span = ({ children }) => {
  return <span className="cursor-pointer text-2xl font-bold duration-300">{children}</span>;
};

const Header = () => {
  return (
    <div className="mt-12 mr-24 flex items-center justify-end gap-12">
      <Span>Use Cases</Span>
      <Span>Blog</Span>
      <Span>Community</Span>
      <Span>Get In Touch</Span>
      <button className="w-min px-8 text-2xl normal-case btn btn-circle btn-outline btn-lg">Documentation</button>
    </div>
  );
};
export default Header;
