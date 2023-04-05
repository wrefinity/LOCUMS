// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://www.locums.com">Irish Locums</NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} made by{" "}
          <a href="https://www.locums.com" target="_blank" rel="noreferrer">
            Irish Locum
          </a>{" "}
          for a medical employment system.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
