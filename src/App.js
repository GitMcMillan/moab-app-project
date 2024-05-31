function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );

  function Header() {
    return <div>This is the header</div>;
  }

  function Menu() {
    return <div>This is the menu</div>;
  }

  function Footer() {
    return <div>This is the footer</div>;
  }
}

export default App;
